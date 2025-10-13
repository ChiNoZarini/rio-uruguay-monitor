# 🌊 Sistema de Monitoreo del Río Uruguay

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-14%2B-brightgreen)](https://nodejs.org)
[![Estado](https://img.shields.io/badge/Estado-Activo-success)](https://github.com)

Sistema elegante de visualización de alturas del Río Uruguay con datos en tiempo real de CARU (Comisión Administradora del Río Uruguay).

![Sistema de Monitoreo](https://via.placeholder.com/800x400/1e3c72/ffffff?text=Sistema+de+Monitoreo+del+Río+Uruguay)

## ✨ Características Principales

- 🌊 **Datos en tiempo real** del Río Uruguay desde CARU
- 📊 **+18 puertos monitoreados** a lo largo del río
- ⏰ **Actualizaciones inteligentes** sincronizadas con CARU (00:05 y 12:05 hs)
- 📱 **Interfaz responsive** que funciona en cualquier dispositivo
- 🔄 **Cache optimizado** de 12 horas entre actualizaciones programadas
- 🎯 **Modo standalone** sin necesidad de servidor
- 📈 **Indicadores de tendencia**: Crece, Baja, Estacionado
- 🎨 **Diseño elegante** tipo display profesional
- 🔧 **API RESTful** para integración con otros sistemas
- 🕐 **Sistema de cron** con timezone argentino configurado

## 🚀 Inicio Rápido

### 📱 **Modo Standalone (Recomendado para pruebas)**
```bash
# Opción 1: Doble clic en el archivo HTML
rio-display.html

# Opción 2: Usar el script de prueba
test-standalone.bat
```

### 🖥️ **Modo Servidor (Datos en tiempo real)**
```bash
# Opción 1: Script automático (Windows)
start-server.bat

# Opción 2: Instalación manual
npm install
npm start

# Acceder a la aplicación
http://localhost:3000
```

## 📦 Instalación

### Requisitos
- **Node.js 14+** (para modo servidor)
- **Navegador web moderno** (para ambos modos)
- **Conexión a internet** (para datos en tiempo real)

### Configuración
1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/TU_USUARIO/rio-uruguay-monitor.git
   cd rio-uruguay-monitor
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura el sistema (opcional):**
   ```bash
   cp config.example.json config.json
   # Edita config.json según tus necesidades
   ```

## 📊 Datos Monitoreados

### 🗺️ Puertos Incluidos
| Región | Puertos |
|--------|---------|
| **🇦🇷 Entre Ríos** | Colón, Concepción del Uruguay, Concordia, Puerto Yeruá, Gualeguaychú |
| **🇺🇾 Uruguay** | Salto, Paysandú, Fray Bentos, Bella Unión, Artigas |
| **🇦🇷 Corrientes** | Monte Caseros, Paso de los Libres |
| **🇧🇷 Brasil** | Uruguayana |

### 📈 Información Disponible
- **Altura actual** (en metros)
- **Tendencia**: ↗️ Crece / ↘️ Baja / ➡️ Estacionado
- **Variación** en las últimas horas
- **Timestamp** de última actualización
- **Estado de la fuente** (real/simulado)

### ⏰ Sistema de Actualizaciones Optimizado
- **CARU actualiza** sus datos a las **00:00** y **12:00** horas
- **Servidor actualiza** a las **00:05** y **12:05** horas (5 minutos después)
- **Cache inteligente** válido por 12 horas entre actualizaciones
- **Timezone configurado**: America/Argentina/Buenos_Aires
- **Reducción del 99%** en requests innecesarios a CARU

## 🔧 API

### Endpoints Disponibles

#### Obtener datos del río
```http
GET /api/river-data
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "data": [
    {
      "puerto": "COLÓN",
      "altura": 5.34,
      "tendencia": "estacionado",
      "fecha": "13/10/2025 - 15:30",
      "variacion": "0.02",
      "lastUpdated": "2025-10-13T15:30:00.000Z"
    }
  ],
  "cached": false,
  "lastUpdate": "2025-10-13T15:30:00.000Z"
}
```

#### Forzar actualización manual
```http
POST /api/force-update
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Actualización completada exitosamente",
  "dataCount": 18,
  "lastUpdate": "2025-10-13T15:30:00.000Z",
  "nextScheduledUpdate": "2025-10-14T00:05:00.000Z"
}
```
```http
GET /health
```

#### Verificar estado del sistema
```http
GET /health
```

**Respuesta:**
```json
{
  "status": "OK",
  "timestamp": "2025-10-13T15:30:00.000Z",
  "lastUpdate": "2025-10-13T12:05:00.000Z",
  "nextScheduledUpdate": "2025-10-14T00:05:00.000Z",
  "updateSchedule": "00:05 y 12:05 hs",
  "cacheStatus": "Con datos",
  "dataCount": 18,
  "isUpdating": false
}
```

## ⚙️ Configuración Avanzada

### Variables de Entorno
Crea un archivo `config.local.json` para personalizar:

```json
{
  "server": {
    "port": 3000,
    "cacheDuration": 43200000
  },
  "scheduler": {
    "caruUpdateHours": [0, 12],
    "updateDelayMinutes": 5,
    "timezone": "America/Argentina/Buenos_Aires"
  },
  "display": {
    "displayInterval": 3000,
    "updateInterval": 43200000
  }
}
```

### Personalización del Display
Modifica `rio-display.html` para cambiar:
- Tiempo de rotación entre puertos
- Colores del tema
- Tamaño de fuentes
- Animaciones

## 📁 Estructura del Proyecto

```
rio-uruguay-monitor/
├── 📄 README.md                     # Documentación
├── 📦 package.json                  # Dependencias y scripts
├── ⚙️  config.json                  # Configuración
├── 🌐 rio-display.html             # Interfaz principal
├── 🖥️  rio-server.js               # Servidor Node.js
├── 🔍 check-system.js              # Herramientas de diagnóstico
├── 🚀 start-server.bat             # Script de inicio (Windows)
├── 🧪 test-standalone.bat          # Script de prueba
├── 📊 caru-data.html               # Interfaz alternativa
└── 📄 argentina-weather-display (2).html # Archivo de respaldo
```

## 🚨 Solución de Problemas

### Problemas Comunes

#### 🔴 El servidor no inicia
```bash
# Verificar Node.js
node --version

# Instalar dependencias
npm install

# Verificar el sistema
npm run check
```

#### 🔴 No se muestran datos reales
1. Verificar conexión a internet
2. Comprobar que el servidor esté ejecutándose
3. Los datos se actualizan cada 10 minutos
4. Revisar logs en la consola del navegador (F12)

#### 🔴 El archivo HTML no funciona
1. Usar un navegador moderno (Chrome, Firefox, Edge)
2. Abrir la consola del navegador (F12) para ver errores
3. Probar con el script `test-standalone.bat`

### Comandos de Diagnóstico
```bash
# Verificar estado completo del sistema
npm run check

# Iniciar en modo desarrollo con logs detallados
npm run dev

# Probar solo la conectividad a CARU
node -e "require('axios').get('http://190.0.152.194:8080/alturas/web/user/alturas').then(r=>console.log('✅ CARU OK')).catch(e=>console.log('❌ CARU Error:', e.message))"
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Para contribuir:

1. **Fork** el repositorio
2. Crea una **rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### Áreas de Mejora
- 📱 Aplicación móvil nativa
- 📊 Gráficos históricos
- 🔔 Sistema de alertas
- 🗺️ Mapa interactivo
- 📈 Predicciones meteorológicas

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Reconocimientos

- **CARU** (Comisión Administradora del Río Uruguay) - Por proporcionar los datos públicos
- **Comunidad de desarrolladores** - Por las librerías y herramientas utilizadas
- **Contribuidores** - Por mejorar y mantener el proyecto

## 📞 Soporte y Contacto

### Reportar Problemas
- 🐛 [Issues en GitHub](https://github.com/TU_USUARIO/rio-uruguay-monitor/issues)
- 📧 Email: tu-email@ejemplo.com

### Documentación Adicional
- 📖 [Wiki del Proyecto](https://github.com/TU_USUARIO/rio-uruguay-monitor/wiki)
- 🎥 [Videos Tutoriales](https://youtube.com/playlist?list=...)
- 💬 [Discusiones](https://github.com/TU_USUARIO/rio-uruguay-monitor/discussions)

---

### 💡 **Tip**: El sistema funciona perfectamente sin servidor - ideal para demostraciones o cuando no necesitas datos en tiempo real.

**¡Disfruta monitoreando el Río Uruguay! 🌊**

---

<div align="center">

**[⭐ Star este proyecto](https://github.com/TU_USUARIO/rio-uruguay-monitor)** si te resulta útil

[![GitHub stars](https://img.shields.io/github/stars/TU_USUARIO/rio-uruguay-monitor?style=social)](https://github.com/TU_USUARIO/rio-uruguay-monitor/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/TU_USUARIO/rio-uruguay-monitor?style=social)](https://github.com/TU_USUARIO/rio-uruguay-monitor/network)

</div>