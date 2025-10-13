# 📋 Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-10-13

### ✨ Agregado
- **Sistema de actualizaciones optimizado** con sincronización horaria
- **Librería node-cron** para manejo robusto de tareas programadas
- **Endpoint de actualización manual** (`POST /api/force-update`)
- **Health check mejorado** con información detallada de actualizaciones
- **Timezone configurado** para Argentina (America/Argentina/Buenos_Aires)

### 🔧 Optimizaciones Principales
- **Reducción del 99% en requests** a CARU (de cada 10 minutos a 2 veces por día)
- **Cache inteligente** de 12 horas entre actualizaciones programadas
- **Sincronización perfecta** con horarios de publicación de CARU (00:00 y 12:00)
- **Actualizaciones del servidor** a las 00:05 y 12:05 (5 minutos después de CARU)
- **Validación de cache** mejorada con lógica de ventanas de actualización

### 📊 Mejoras en API
- Nuevos campos en `/api/river-data`: `nextScheduledUpdate`, `updateSchedule`
- Health check expandido con: `lastUpdate`, `nextScheduledUpdate`, `cacheStatus`, `dataCount`
- Endpoint `POST /api/force-update` para actualizaciones manuales
- Mejor manejo de errores y estados de actualización

### 🔧 Configuración
- Nueva sección `scheduler` en config.json
- Variables de entorno para timezone y horarios
- Cache duration aumentado a 43200000ms (12 horas)

## [1.0.0] - 2024-10-13

### ✨ Agregado
- Sistema completo de monitoreo del Río Uruguay
- Integración con datos en tiempo real de CARU
- Interfaz web responsive con diseño elegante
- API RESTful para acceso a datos
- Modo standalone sin necesidad de servidor
- Scripts de configuración automática para Windows y Linux
- Sistema de cache inteligente para optimización
- Manejo de errores con fallback a datos de demostración
- Rotación automática de puertos en display
- Indicadores de tendencia (crece, baja, estacionado)

### 🔧 Características Técnicas
- Servidor Node.js con Express
- Scraping automático de datos CARU
- Cache con duración configurable
- Detección y eliminación de duplicados
- Normalización de nombres de puertos
- Sistema de health checks
- Logs detallados y diagnósticos

### 📊 Datos Monitoreados
- 18+ puertos del Río Uruguay
- Alturas en tiempo real en metros
- Tendencias de variación
- Timestamps de última actualización
- Información de variaciones por período

### 🎨 Interfaz
- Diseño tipo display profesional
- Pantalla negra con tipografía clara
- Animaciones suaves entre transiciones
- Indicadores visuales de estado
- Responsive para diferentes dispositivos

### 🔧 Herramientas de Desarrollo
- Scripts de configuración automática
- Sistema de verificación completa
- Docker y Docker Compose
- Configuración de Nginx
- Variables de entorno
- Guías de contribución y despliegue

### 📁 Estructura del Proyecto
- Documentación completa en markdown
- Configuración de ejemplo
- Scripts multiplataforma
- Archivos de Docker para containerización
- Licencia MIT

### 🌐 Compatibilidad
- Node.js 14+
- Navegadores modernos
- Windows, Linux, macOS
- Docker y contenedores
- Herramientas de CI/CD

---

## Formato de Versiones

### [Unreleased]
- Cambios en desarrollo

### [X.Y.Z] - YYYY-MM-DD
### Agregado
- Nuevas características

### Cambiado
- Cambios en funcionalidades existentes

### Deprecated
- Características que serán removidas

### Removido
- Características removidas

### Corregido
- Corrección de bugs

### Seguridad
- Mejoras de seguridad