const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const cron = require('node-cron');
const path = require('path');
const fs = require('fs');

// Cargar configuración
let config;
try {
    const configPath = path.join(__dirname, 'config.json');
    const configFile = fs.readFileSync(configPath, 'utf8');
    config = JSON.parse(configFile);
} catch (error) {
    console.error('Error al cargar el archivo de configuración:', error);
    process.exit(1);
}

const app = express();
const PORT = config.server.port || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Cache para datos
let cachedData = null;
let lastUpdate = 0;
let isUpdating = false;
let nextScheduledUpdate = null;

// Configuración de horarios de actualización CARU
const CARU_UPDATE_HOURS = config.scheduler.caruUpdateHours; // CARU actualiza a las 00:00 y 12:00
const UPDATE_DELAY_MINUTES = config.scheduler.updateDelayMinutes; // Esperamos 5 minutos después de la actualización de CARU
const CACHE_DURATION = config.server.cacheDuration; // 12 horas (hasta próxima actualización programada)

// Lista de puertos del Río Uruguay basada en los datos reales de CARU
const PUERTOS_MAP = {
    'Monte Caseros': 'MONTE CASEROS',
    'Bella Unión': 'BELLA UNIÓN', 
    'Mocoretá': 'MOCORETÁ',
    'Federación': 'FEDERACIÓN',
    'Federación Embalse': 'FEDERACIÓN EMBALSE',
    'Salto Grande Aguas Arriba': 'SALTO GRANDE ARRIBA',
    'Salto Grande Aguas Abajo': 'SALTO GRANDE ABAJO',
    'Salto': 'SALTO',
    'Concordia': 'CONCORDIA',
    'Colón': 'COLÓN',
    'Concepción del Uruguay': 'CONCEPCIÓN DEL URUGUAY',
    'Puerto Yeruá': 'PUERTO YERUÁ',
    'Paysandú': 'PAYSANDÚ',
    'Fray Bentos': 'FRAY BENTOS',
    'Gualeguaychú': 'GUALEGUAYCHÚ',
    'San Javier': 'SAN JAVIER',
    'Puerto Unzué': 'PUERTO UNZUÉ',
    'Artigas': 'ARTIGAS',
    'Constitución': 'CONSTITUCIÓN',
    'Paso de los Libres': 'PASO DE LOS LIBRES',
    'Uruguayana': 'URUGUAYANA',
    'Campichuelo': 'CAMPICHUELO',
    'Boca del Gualeguaychú': 'BOCA DEL GUALEGUAYCHÚ',
    'Boca Gualeguaychú': 'BOCA DEL GUALEGUAYCHÚ',
    'Nueva Palmira': 'NUEVA PALMIRA',
    'Nuevo Berlín': 'NUEVO BERLÍN'
};

// Función para normalizar nombres de puerto y detectar variaciones
function normalizePuertoName(name) {
    let normalized = name
        .toUpperCase()
        .replace(/[ÀÁÂÃÄÅ]/g, 'A')
        .replace(/[ÈÉÊË]/g, 'E')
        .replace(/[ÌÍÎÏ]/g, 'I')
        .replace(/[ÒÓÔÕÖ]/g, 'O')
        .replace(/[ÙÚÛÜ]/g, 'U')
        .replace(/[Ñ]/g, 'N')
        .replace(/[Ç]/g, 'C')
        .trim();
    
    // Normalizar variaciones específicas conocidas
    if (normalized.includes('GUALEGUAY') || normalized.includes('GUALEGUY')) {
        normalized = normalized.replace(/GUALEGUY[CÇ]H?[UÚ]?/g, 'GUALEGUAYCHU');
    }
    
    // Otras normalizaciones específicas
    normalized = normalized
        .replace(/CONCEPCI[OÓ]N?\s+DEL\s+URUGUAY/g, 'CONCEPCION DEL URUGUAY')
        .replace(/FEDERACI[OÓ]N?\s+EMBALSE/g, 'FEDERACION EMBALSE')
        .replace(/SALTO\s+GRANDE\s+AGUAS?\s+(ARRIBA|ABAJO)/g, 'SALTO GRANDE $1')
        .replace(/AGUAS?\s+ARRIBA/g, 'ARRIBA')
        .replace(/AGUAS?\s+ABAJO/g, 'ABAJO');
    
    return normalized;
}

// Función para crear clave única de puerto
function createPortKey(name) {
    const normalized = normalizePuertoName(name);
    
    // Crear una clave más específica para evitar duplicados sutiles
    let key = normalized
        .replace(/\s+/g, '_')
        .replace(/[^A-Z0-9_]/g, '');
    
    // Manejar casos específicos de duplicados conocidos
    if (key.includes('BOCA') && key.includes('GUALEGUAYCHU')) {
        key = 'BOCA_DEL_GUALEGUAYCHU'; // Unificar todas las variaciones
    }
    
    return key;
}

// Función para calcular próxima actualización programada
function calculateNextUpdate() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Encontrar la próxima hora de actualización
    let nextHour = CARU_UPDATE_HOURS.find(hour => 
        hour > currentHour || (hour === currentHour && currentMinute < UPDATE_DELAY_MINUTES)
    );
    
    // Si no encontramos una hora hoy, usar la primera del día siguiente
    if (!nextHour) {
        nextHour = CARU_UPDATE_HOURS[0];
    }
    
    const nextUpdate = new Date(now);
    
    if (nextHour <= currentHour && !(nextHour === currentHour && currentMinute < UPDATE_DELAY_MINUTES)) {
        // Actualización del día siguiente
        nextUpdate.setDate(nextUpdate.getDate() + 1);
    }
    
    nextUpdate.setHours(nextHour, UPDATE_DELAY_MINUTES, 0, 0);
    
    return nextUpdate;
}

// Función para verificar si es hora de actualizar
function shouldUpdateNow() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Solo actualizar en las ventanas programadas (12:05 o 00:05)
    return CARU_UPDATE_HOURS.some(hour => 
        currentHour === hour && currentMinute >= UPDATE_DELAY_MINUTES && currentMinute < UPDATE_DELAY_MINUTES + 10
    );
}

// Función para verificar si el cache sigue siendo válido
function isCacheValid() {
    if (!cachedData || !lastUpdate) return false;
    
    const now = Date.now();
    const timeSinceUpdate = now - lastUpdate;
    
    // Si ha pasado más de 12 horas, el cache es inválido
    if (timeSinceUpdate > CACHE_DURATION) return false;
    
    // Si estamos en ventana de actualización y han pasado más de 10 minutos, invalidar
    if (shouldUpdateNow() && timeSinceUpdate > 10 * 60 * 1000) return false;
    
    return true;
}

async function scrapeRiverData() {
    try {
        console.log('🌊 Obteniendo datos reales de CARU...');
        const response = await axios.get(config.api.sourceUrl, {
            timeout: config.server.timeout || 15000,
            headers: {
                'User-Agent': config.api.userAgent,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'keep-alive'
            }
        });

        const $ = cheerio.load(response.data);
        const riverDataMap = new Map(); // Usar Map para evitar duplicados
        
        console.log('📊 Procesando tabla de datos de CARU...');

        // Buscar la tabla principal con los datos
        $('table.table-striped tbody tr').each((index, row) => {
            const $row = $(row);
            const cells = $row.find('td');
            
            if (cells.length >= 6) {
                // Extraer datos de cada celda
                const puertoCell = $(cells[0]).text().trim();
                const fechaHoraCell = $(cells[1]).text().trim(); 
                const alturaCell = $(cells[2]).text().trim();
                const variacionCell = $(cells[3]).text().trim();
                const periodoCell = $(cells[4]).text().trim();
                const estadoCell = $(cells[5]).text().trim();
                
                // Limpiar el nombre del puerto
                const puertoOriginal = puertoCell;
                let puertoDisplay = PUERTOS_MAP[puertoOriginal] || puertoOriginal.toUpperCase();
                
                // Normalizar nombre para evitar duplicados por caracteres especiales
                puertoDisplay = normalizePuertoName(puertoDisplay);
                
                // Crear una clave única para evitar duplicados similares
                const puertoKey = createPortKey(puertoDisplay);
                
                // Extraer la altura (número decimal)
                const alturaMatch = alturaCell.match(/(\d+\.?\d*)/);
                const altura = alturaMatch ? parseFloat(alturaMatch[1]) : null;
                
                // Extraer el estado/tendencia
                let tendencia = 'estacionado';
                const estadoLower = estadoCell.toLowerCase();
                if (estadoLower.includes('crece') || estadoLower.includes('sube')) {
                    tendencia = 'crece';
                } else if (estadoLower.includes('baja') || estadoLower.includes('desciende')) {
                    tendencia = 'baja';
                } else if (estadoLower.includes('estaciona') || estadoLower.includes('estable')) {
                    tendencia = 'estacionado';
                }
                
                if (altura !== null && puertoOriginal) {
                    // Solo agregar si no existe ya este puerto (usando clave normalizada)
                    if (!riverDataMap.has(puertoKey)) {
                        const portData = {
                            puerto: puertoDisplay,
                            altura: altura,
                            tendencia: tendencia,
                            fecha: fechaHoraCell,
                            variacion: variacionCell,
                            periodo: periodoCell,
                            lastUpdated: new Date().toISOString(),
                            source: 'CARU_REAL'
                        };
                        
                        riverDataMap.set(puertoKey, portData);
                        console.log(`✅ ${puertoDisplay}: ${altura}m - ${tendencia}`);
                    } else {
                        console.log(`⚠️  Duplicado ignorado: ${puertoDisplay} (clave: ${puertoKey})`);
                    }
                }
            }
        });

        // Convertir Map a Array
        const riverData = Array.from(riverDataMap.values());

        // Si encontramos datos, procesarlos
        if (riverData.length > 0) {
            console.log(`🎯 Datos reales extraídos: ${riverData.length} puertos únicos`);
            
            // Ordenar por nombre de puerto para consistencia
            riverData.sort((a, b) => a.puerto.localeCompare(b.puerto));
            
            return riverData;
        } else {
            throw new Error('No se pudieron extraer datos de la tabla HTML');
        }

    } catch (error) {
        console.error('❌ Error al obtener datos reales de CARU:', error.message);
        console.log('🔄 Generando datos de demostración...');
        
        // Generar datos de demostración basados en puertos conocidos (sin duplicados)
        const puertosPrincipales = [
            'COLÓN', 'CONCEPCIÓN DEL URUGUAY', 'CONCORDIA', 'MONTE CASEROS', 
            'BELLA UNIÓN', 'SALTO', 'PAYSANDÚ', 'FRAY BENTOS',
            'GUALEGUAYCHÚ', 'FEDERACIÓN', 'PUERTO YERUÁ', 'SAN JAVIER',
            'ARTIGAS', 'CONSTITUCIÓN', 'PASO DE LOS LIBRES', 'URUGUAYANA'
        ];
        
        return puertosPrincipales.map((puerto, index) => {
            // Generar alturas realistas basadas en datos históricos del río
            const baseHeight = 3 + Math.random() * 7; // Entre 3 y 10 metros
            const tendencias = ['crece', 'baja', 'estacionado'];
            const tendency = tendencias[Math.floor(Math.random() * tendencias.length)];
            
            return {
                puerto: puerto,
                altura: parseFloat(baseHeight.toFixed(2)),
                tendencia: tendency,
                fecha: new Date().toLocaleDateString('es-AR') + ' - ' + new Date().toLocaleTimeString('es-AR', {hour: '2-digit', minute: '2-digit'}),
                variacion: (Math.random() * 0.4 - 0.2).toFixed(2),
                periodo: '12 hs.',
                lastUpdated: new Date().toISOString(),
                source: 'DEMO_DATA',
                backup: true
            };
        });
    }
}

// Ruta para obtener datos del río
app.get('/api/river-data', async (req, res) => {
    try {
        const now = Date.now();
        
        // Verificar si el cache sigue siendo válido
        if (cachedData && isCacheValid()) {
            const nextUpdate = calculateNextUpdate();
            return res.json({
                success: true,
                data: cachedData,
                cached: true,
                lastUpdate: new Date(lastUpdate).toISOString(),
                nextScheduledUpdate: nextUpdate.toISOString(),
                updateSchedule: `Actualizaciones programadas a las ${CARU_UPDATE_HOURS.map(h => h.toString().padStart(2, '0') + ':' + UPDATE_DELAY_MINUTES.toString().padStart(2, '0')).join(' y ')} hs`
            });
        }

        // Si ya se está actualizando, devolver cache existente si existe
        if (isUpdating && cachedData) {
            const nextUpdate = calculateNextUpdate();
            return res.json({
                success: true,
                data: cachedData,
                cached: true,
                updating: true,
                lastUpdate: new Date(lastUpdate).toISOString(),
                nextScheduledUpdate: nextUpdate.toISOString()
            });
        }

        // Verificar si estamos en ventana de actualización o si es la primera carga
        const shouldUpdate = !cachedData || shouldUpdateNow() || !isCacheValid();
        
        if (shouldUpdate && !isUpdating) {
            isUpdating = true;
            const updateReason = !cachedData ? 'primera_carga' : 
                                shouldUpdateNow() ? 'ventana_programada' : 'cache_expirado';
            
            try {
                console.log(`🔄 Actualizando datos por: ${updateReason}`);
                const riverData = await scrapeRiverData();
                cachedData = riverData;
                lastUpdate = now;
                nextScheduledUpdate = calculateNextUpdate();
                console.log(`✅ Cache actualizado. Próxima actualización: ${nextScheduledUpdate.toLocaleString('es-AR')}`);
            } catch (error) {
                console.error('❌ Error al actualizar cache:', error.message);
                // Si hay error pero tenemos cache previo, usarlo
                if (cachedData) {
                    console.log('📦 Usando datos en cache debido a error');
                }
            } finally {
                isUpdating = false;
            }
        }

        const nextUpdate = calculateNextUpdate();
        res.json({
            success: true,
            data: cachedData || [],
            cached: shouldUpdate ? false : true,
            lastUpdate: new Date(lastUpdate).toISOString(),
            nextScheduledUpdate: nextUpdate.toISOString(),
            updateSchedule: `Actualizaciones programadas a las ${CARU_UPDATE_HOURS.map(h => h.toString().padStart(2, '0') + ':' + UPDATE_DELAY_MINUTES.toString().padStart(2, '0')).join(' y ')} hs`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            cachedData: cachedData ? true : false,
            nextScheduledUpdate: calculateNextUpdate().toISOString()
        });
    }
});

// Ruta para servir el HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'rio-display.html'));
});

// Ruta de salud con información de actualizaciones
app.get('/health', (req, res) => {
    const nextUpdate = calculateNextUpdate();
    const now = new Date();
    const timeSinceLastUpdate = lastUpdate ? Math.floor((now - lastUpdate) / 1000 / 60) : null;
    
    res.json({ 
        status: 'OK', 
        timestamp: now.toISOString(),
        lastUpdate: lastUpdate ? new Date(lastUpdate).toISOString() : null,
        timeSinceLastUpdate: timeSinceLastUpdate ? `${timeSinceLastUpdate} minutos` : 'No disponible',
        nextScheduledUpdate: nextUpdate.toISOString(),
        cacheStatus: cachedData ? 'Con datos' : 'Sin datos',
        dataCount: cachedData ? cachedData.length : 0,
        isUpdating: isUpdating,
        updateSchedule: `${CARU_UPDATE_HOURS.map(h => h.toString().padStart(2, '0') + ':' + UPDATE_DELAY_MINUTES.toString().padStart(2, '0')).join(' y ')} hs`
    });
});

// Ruta para forzar actualización manual (útil para testing)
app.post('/api/force-update', async (req, res) => {
    if (isUpdating) {
        return res.status(429).json({
            success: false,
            error: 'Actualización ya en progreso',
            isUpdating: true
        });
    }

    try {
        console.log('🔄 Actualización manual forzada solicitada');
        isUpdating = true;
        
        const riverData = await scrapeRiverData();
        cachedData = riverData;
        lastUpdate = Date.now();
        nextScheduledUpdate = calculateNextUpdate();
        
        console.log('✅ Actualización manual forzada completada');
        
        res.json({
            success: true,
            message: 'Actualización completada exitosamente',
            dataCount: riverData.length,
            lastUpdate: new Date(lastUpdate).toISOString(),
            nextScheduledUpdate: nextScheduledUpdate.toISOString()
        });
    } catch (error) {
        console.error('❌ Error en actualización manual forzada:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    } finally {
        isUpdating = false;
    }
});

// Inicializar sistema de actualizaciones programadas con node-cron
function initializeScheduledUpdates() {
    const nextUpdate = calculateNextUpdate();
    console.log(`⏰ Sistema de actualizaciones programado iniciado`);
    console.log(`📅 Horarios de actualización CARU: ${CARU_UPDATE_HOURS.map(h => h.toString().padStart(2, '0') + ':00').join(' y ')}`);
    console.log(`🔄 Horarios de actualización del servidor: ${CARU_UPDATE_HOURS.map(h => h.toString().padStart(2, '0') + ':' + UPDATE_DELAY_MINUTES.toString().padStart(2, '0')).join(' y ')}`);
    console.log(`⏳ Próxima actualización programada: ${nextUpdate.toLocaleString('es-AR')}`);
    
    // Programar actualizaciones con cron: a las 00:05 y 12:05 todos los días
    cron.schedule('5 0,12 * * *', async () => {
        const now = new Date();
        console.log(`⏰ 🔄 Iniciando actualización programada: ${now.toLocaleString('es-AR')}`);
        
        if (!isUpdating) {
            isUpdating = true;
            try {
                const riverData = await scrapeRiverData();
                cachedData = riverData;
                lastUpdate = Date.now();
                nextScheduledUpdate = calculateNextUpdate();
                console.log(`✅ ⏰ Actualización programada completada exitosamente`);
                console.log(`📊 Datos actualizados: ${riverData.length} puertos`);
                console.log(`⏳ Próxima actualización: ${nextScheduledUpdate.toLocaleString('es-AR')}`);
            } catch (error) {
                console.error('❌ ⏰ Error en actualización programada:', error.message);
                console.log('🔄 Se mantendrán los datos en cache hasta la próxima actualización');
            } finally {
                isUpdating = false;
            }
        } else {
            console.log('⚠️ ⏰ Actualización ya en progreso, omitiendo');
        }
    }, {
        scheduled: true,
        timezone: config.scheduler.timezone
    });
    
    console.log('✅ Cron jobs programados correctamente (timezone: America/Argentina/Buenos_Aires)');
}

// Función simplificada para verificar actualizaciones manuales
async function checkScheduledUpdate() {
    if (shouldUpdateNow() && !isUpdating) {
        const now = new Date();
        console.log(`🔄 Actualización manual solicitada: ${now.toLocaleString('es-AR')}`);
        
        isUpdating = true;
        try {
            const riverData = await scrapeRiverData();
            cachedData = riverData;
            lastUpdate = Date.now();
            nextScheduledUpdate = calculateNextUpdate();
            console.log(`✅ Actualización manual completada. Próxima: ${nextScheduledUpdate.toLocaleString('es-AR')}`);
            return riverData;
        } catch (error) {
            console.error('❌ Error en actualización manual:', error.message);
            throw error;
        } finally {
            isUpdating = false;
        }
    }
    return null;
}

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🌊 Servidor de datos del río iniciado en http://localhost:${PORT}`);
    console.log(`📊 API disponible en http://localhost:${PORT}/api/river-data`);
    
    // Inicializar sistema de actualizaciones programadas
    initializeScheduledUpdates();
});

// Obtener datos iniciales
async function initializeData() {
    try {
        console.log('🔄 Cargando datos iniciales...');
        const data = await scrapeRiverData();
        cachedData = data;
        lastUpdate = Date.now();
        nextScheduledUpdate = calculateNextUpdate();
        console.log('✅ Datos iniciales cargados');
        console.log(`⏳ Próxima actualización: ${nextScheduledUpdate.toLocaleString('es-AR')}`);
    } catch (error) {
        console.error('❌ Error cargando datos iniciales:', error.message);
        console.log('🔄 El sistema usará datos de demostración hasta la próxima actualización programada');
    }
}

// Inicializar datos al arrancar
initializeData();