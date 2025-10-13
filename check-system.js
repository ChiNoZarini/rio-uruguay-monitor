const axios = require('axios');

async function checkSystem() {
    console.log('🔍 Verificando sistema de monitoreo del Río Uruguay...\n');
    
    // Verificar salud del servidor
    try {
        console.log('📊 Verificando servidor local...');
        const healthResponse = await axios.get('http://localhost:3000/health');
        const healthData = healthResponse.data;
        
        console.log('✅ Servidor local: OK');
        console.log(`   Timestamp: ${healthData.timestamp}`);
        console.log(`   Última actualización: ${healthData.lastUpdate || 'No disponible'}`);
        console.log(`   Tiempo desde última actualización: ${healthData.timeSinceLastUpdate}`);
        console.log(`   Próxima actualización programada: ${healthData.nextScheduledUpdate}`);
        console.log(`   Horarios de actualización: ${healthData.updateSchedule}`);
        console.log(`   Estado del cache: ${healthData.cacheStatus}`);
        console.log(`   Datos disponibles: ${healthData.dataCount} puertos`);
        console.log(`   Actualizando: ${healthData.isUpdating ? 'Sí' : 'No'}\n`);
    } catch (error) {
        console.log('❌ Servidor local: NO DISPONIBLE');
        console.log('   Asegúrate de que el servidor esté corriendo con "npm start"\n');
        return;
    }
    
    // Verificar API de datos
    try {
        console.log('🌊 Verificando API de datos del río...');
        const dataResponse = await axios.get('http://localhost:3000/api/river-data');
        const data = dataResponse.data;
        
        if (data.success) {
            console.log('✅ API de datos: OK');
            console.log(`   Puertos disponibles: ${data.data.length}`);
            console.log(`   Última actualización: ${data.lastUpdate}`);
            console.log(`   Datos en cache: ${data.cached ? 'Sí' : 'No'}`);
            console.log(`   Próxima actualización programada: ${data.nextScheduledUpdate}`);
            console.log(`   Horarios de actualización: ${data.updateSchedule}\n`);
            
            // Mostrar resumen de datos
            console.log('📋 Resumen de datos:');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            
            const realData = data.data.filter(p => !p.simulated && !p.backup && !p.error);
            const simulatedData = data.data.filter(p => p.simulated || p.backup || p.error);
            
            console.log(`🔄 Datos reales: ${realData.length}`);
            console.log(`🤖 Datos simulados: ${simulatedData.length}`);
            
            // Calcular tiempo hasta próxima actualización
            const now = new Date();
            const nextUpdate = new Date(data.nextScheduledUpdate);
            const hoursUntilNext = Math.round((nextUpdate - now) / (1000 * 60 * 60));
            console.log(`⏳ Próxima actualización en: ${hoursUntilNext} horas`);
            
            // Estadísticas de tendencias
            const tendencias = data.data.reduce((acc, port) => {
                acc[port.tendencia] = (acc[port.tendencia] || 0) + 1;
                return acc;
            }, {});
            
            console.log('\n📈 Tendencias actuales:');
            Object.entries(tendencias).forEach(([tendencia, count]) => {
                const icon = tendencia === 'crece' ? '↗️' : tendencia === 'baja' ? '↘️' : '➡️';
                console.log(`   ${icon} ${tendencia.toUpperCase()}: ${count} puertos`);
            });
            
            // Mostrar algunos ejemplos
            console.log('\n🎯 Ejemplos de datos actuales:');
            data.data.slice(0, 5).forEach(port => {
                const status = port.simulated || port.backup || port.error ? ' (simulado)' : ' (real)';
                const icon = port.tendencia === 'crece' ? '↗️' : port.tendencia === 'baja' ? '↘️' : '➡️';
                console.log(`   ${icon} ${port.puerto}: ${port.altura}m - ${port.tendencia}${status}`);
            });
            
        } else {
            console.log('❌ API de datos: ERROR');
            console.log(`   Error: ${data.error}\n`);
        }
    } catch (error) {
        console.log('❌ API de datos: NO DISPONIBLE');
        console.log(`   Error: ${error.message}\n`);
    }
    
    // Verificar fuente original
    try {
        console.log('\n🌐 Verificando fuente de datos CARU...');
        const caruResponse = await axios.get('http://190.0.152.194:8080/alturas/web/user/alturas', {
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        if (caruResponse.status === 200) {
            console.log('✅ Fuente CARU: DISPONIBLE');
            console.log(`   Status: ${caruResponse.status}`);
            console.log(`   Tamaño respuesta: ${Math.round(caruResponse.data.length / 1024)}KB`);
        }
    } catch (error) {
        console.log('⚠️  Fuente CARU: PROBLEMAS DE CONEXIÓN');
        console.log(`   Error: ${error.message}`);
        console.log('   El sistema funcionará con datos simulados');
    }
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎯 Para acceder al sistema:');
    console.log('   🌐 Interfaz web: http://localhost:3000');
    console.log('   📊 API de datos: http://localhost:3000/api/river-data');
    console.log('   💡 Salud del sistema: http://localhost:3000/health');
    console.log('   🔄 Forzar actualización: POST http://localhost:3000/api/force-update');
    console.log('\n💡 Información del sistema de actualizaciones:');
    console.log('   ⏰ CARU actualiza datos a las 00:00 y 12:00 hs');
    console.log('   🔄 El servidor actualiza a las 00:05 y 12:05 hs');
    console.log('   💾 Cache válido por 12 horas entre actualizaciones');
    console.log('   🌍 Timezone: America/Argentina/Buenos_Aires');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Ejecutar verificación
checkSystem().catch(console.error);