# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Versionado Semántico](https://semver.org/lang/es/).

## [1.1.0] - 2024-01-15

### 🎉 Añadido
- Sistema de cache inteligente con duración de 12 horas
- Actualización automática programada (00:05 y 12:05)
- Configuración avanzada mediante archivo `config.json`
- Soporte para múltiples temas visuales
- API REST para acceso a datos programático
- Estados visuales por rangos de altura
- Script de inicio automático para Windows (`start.bat`)
- Monitoreo de 16 puertos del Río Uruguay
- Soporte para datos de Argentina, Uruguay y Brasil

### 🔧 Mejorado
- Optimización del rendimiento con sistema de cache
- Interfaz de usuario más moderna y responsive
- Mejor manejo de errores y timeouts
- Documentación completa del proyecto
- Estructura de configuración más flexible

### 🐛 Corregido
- Problemas de sincronización con horarios de CARU
- Manejo mejorado de conexiones timeout
- Validación de datos de entrada más robusta

## [1.0.0] - 2024-01-01

### 🎉 Añadido
- Versión inicial del sistema de monitoreo
- Obtención de datos básicos de CARU
- Interfaz web simple para visualización
- Servidor Express básico
- Configuración inicial de puertos

### 📝 Notas
- Primera versión funcional del sistema
- Datos obtenidos directamente de la fuente oficial CARU
- Soporte inicial para principales puertos del Río Uruguay

---

## Tipos de cambios

- `🎉 Añadido` para nuevas funcionalidades
- `🔧 Mejorado` para cambios en funcionalidades existentes
- `🐛 Corregido` para corrección de bugs
- `🗑️ Eliminado` para funcionalidades eliminadas
- `🔒 Seguridad` para vulnerabilidades

## Enlaces

- [Sin lanzar]: https://github.com/ChiNoZarini/rio-uruguay-monitor/compare/v1.1.0...HEAD
- [1.1.0]: https://github.com/ChiNoZarini/rio-uruguay-monitor/compare/v1.0.0...v1.1.0
- [1.0.0]: https://github.com/ChiNoZarini/rio-uruguay-monitor/releases/tag/v1.0.0