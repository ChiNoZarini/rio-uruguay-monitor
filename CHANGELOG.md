# 📝 Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

## [1.1.0] - 2024-01-15

### ✨ Agregado
- Sistema completo de monitoreo del Río Uruguay
- API REST para acceso programático a datos
- Interfaz web responsive con visualización en tiempo real
- Cache inteligente con actualización automática
- Soporte para 20+ puertos del Río Uruguay
- Documentación completa del proyecto

### 🔧 Características Técnicas
- Servidor Express.js con CORS habilitado
- Web scraping de datos oficiales de CARU
- Programación automática con node-cron
- Tres interfaces web diferentes:
  - Interfaz principal con servidor
  - Versión standalone
  - Vista específica de datos CARU

### 📊 Datos Monitoreados
- **Tramo Superior**: Monte Caseros, Bella Unión, Mocoretá, Artigas, Paso de los Libres, Uruguayana
- **Tramo Medio**: Federación, Salto Grande, Salto, Concordia, Colón
- **Tramo Inferior**: Concepción del Uruguay, Paysandú, Fray Bentos, Gualeguaychú, San Javier

### 🕐 Horarios de Actualización
- Actualización automática: 00:00 y 12:00 UTC (siguiendo horarios CARU)
- Retraso del sistema: 5 minutos después de cada actualización
- Cache: 12 horas de duración

## [1.0.0] - 2024-01-14

### ✨ Initial Release
- Versión inicial del proyecto
- Configuración básica del repositorio

---

### Formato
Este changelog sigue el formato de [Keep a Changelog](https://keepachangelog.com/es/1.0.0/),
y este proyecto se adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).