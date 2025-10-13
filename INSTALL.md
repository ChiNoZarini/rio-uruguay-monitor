# 📋 Guía de Instalación - Rio Uruguay Monitor

## Instalación Rápida

### 1️⃣ Descargar e Instalar

```bash
# Clonar repositorio
git clone https://github.com/ChiNoZarini/rio-uruguay-monitor.git
cd rio-uruguay-monitor

# Instalar dependencias
npm install
```

### 2️⃣ Configuración (Opcional)

```bash
# Copiar archivo de configuración de ejemplo
cp .env.example .env

# Editar configuración si es necesario
# El archivo config.json ya tiene valores predeterminados
```

### 3️⃣ Ejecutar

```bash
# Modo producción
npm start

# Modo desarrollo (con auto-reload)
npm run dev
```

### 4️⃣ Acceder

Abre tu navegador en: **http://localhost:3000**

## Configuración Avanzada

### Variables de Entorno (.env)
- `PORT`: Puerto del servidor (default: 3000)
- `CACHE_TIMEOUT`: Tiempo de cache en ms (default: 12 horas)
- `LOG_LEVEL`: Nivel de logs (info, debug, error)

### Archivo config.json
```json
{
  "port": 3000,
  "cacheTimeout": 43200000,
  "updateHours": [0, 12],
  "delayMinutes": 5,
  "maxRetries": 3
}
```

## Solución de Problemas

### Error de permisos de puerto
```bash
# Cambiar puerto en config.json o usar variables de entorno
export PORT=8080
npm start
```

### Error de conexión a CARU
- Verificar conexión a internet
- El sistema reintentará automáticamente
- Los datos se actualizan cada 12 horas

### Dependencias faltantes
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

## Verificación de Instalación

Visita estos endpoints para verificar:
- **Interfaz**: http://localhost:3000
- **API**: http://localhost:3000/api/rio-data
- **Estado**: Deberías ver datos de alturas del río

¡Instalación completada! 🎉