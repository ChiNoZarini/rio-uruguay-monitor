# 📦 Guía de Instalación - Rio Uruguay Monitor

Esta guía te llevará paso a paso para instalar y configurar el sistema de monitoreo del Río Uruguay.

## 📋 Requisitos del Sistema

### Mínimos
- **Sistema Operativo**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+
- **Node.js**: versión 14.0.0 o superior
- **NPM**: versión 6.0.0 o superior
- **RAM**: 512 MB disponible
- **Espacio en disco**: 100 MB

### Recomendados
- **Node.js**: versión 18.0.0 o superior
- **NPM**: versión 8.0.0 o superior
- **RAM**: 1 GB disponible
- **Conexión a internet**: estable para obtener datos de CARU

## 🚀 Instalación

### Método 1: Instalación desde GitHub (Recomendado)

1. **Verificar Node.js**
   ```bash
   node --version
   npm --version
   ```
   Si no tienes Node.js instalado, descárgalo desde [nodejs.org](https://nodejs.org/)

2. **Clonar el repositorio**
   ```bash
   git clone https://github.com/ChiNoZarini/rio-uruguay-monitor.git
   cd rio-uruguay-monitor
   ```

3. **Instalar dependencias**
   ```bash
   npm install
   ```

4. **Iniciar el servidor**
   ```bash
   npm start
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Método 2: Descarga directa (ZIP)

1. **Descargar**: Ve a [GitHub Releases](https://github.com/ChiNoZarini/rio-uruguay-monitor/releases) y descarga la última versión
2. **Extraer**: Descomprime el archivo ZIP en tu directorio preferido
3. **Instalar dependencias**: Abre terminal en la carpeta extraída y ejecuta:
   ```bash
   npm install
   ```
4. **Iniciar**: Ejecuta `npm start`

### Método 3: Instalación en Windows (Un click)

1. **Descargar** el proyecto como ZIP o clonarlo
2. **Ejecutar** el archivo `start.bat`
3. El script automáticamente:
   - Verifica si Node.js está instalado
   - Instala las dependencias si es necesario
   - Inicia el servidor
   - Abre el navegador

## ⚙️ Configuración

### Configuración Básica

El archivo `config.json` contiene todas las configuraciones:

```json
{
  "server": {
    "port": 3000,
    "cacheDuration": 43200000,
    "timeout": 15000
  },
  "display": {
    "displayInterval": 4000,
    "updateInterval": 43200000
  },
  "scheduler": {
    "caruUpdateHours": [0, 12],
    "updateDelayMinutes": 5
  }
}
```

### Cambiar Puerto del Servidor

Para usar un puerto diferente al 3000:

1. **Editar config.json**:
   ```json
   {
     "server": {
       "port": 8080
     }
   }
   ```

2. **O usar variable de entorno**:
   ```bash
   PORT=8080 npm start
   ```

### Configuración de Proxy/Firewall

Si estás detrás de un proxy corporativo, asegúrate de que el puerto 80/443 esté abierto para conectar con CARU:
- URL de CARU: `http://190.0.152.194:8080`

## 🔧 Scripts Disponibles

```bash
# Iniciar en producción
npm start

# Iniciar en desarrollo (reinicio automático)
npm run dev

# Instalar dependencias
npm install

# Verificar estado del servidor
curl http://localhost:3000/api/status
```

## 🐳 Instalación con Docker (Opcional)

Si prefieres usar Docker:

1. **Crear Dockerfile**:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Construir imagen**:
   ```bash
   docker build -t rio-monitor .
   ```

3. **Ejecutar contenedor**:
   ```bash
   docker run -p 3000:3000 rio-monitor
   ```

## 🔍 Verificación de Instalación

### Pruebas Básicas

1. **Servidor funcionando**:
   ```bash
   curl http://localhost:3000/api/status
   ```
   Debería retornar información del estado del sistema.

2. **Datos disponibles**:
   ```bash
   curl http://localhost:3000/api/data
   ```
   Debería retornar datos de alturas de los puertos.

3. **Interfaz web**:
   Abre `http://localhost:3000` y verifica que se muestre el dashboard.

### Logs del Sistema

Los logs se muestran en la consola. Busca:
- ✅ `Servidor ejecutándose en puerto 3000`
- ✅ `Datos actualizados exitosamente`
- ✅ `Próxima actualización programada: ...`

## 🛠️ Solución de Problemas

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port already in use"
```bash
# Cambiar puerto en config.json o
PORT=3001 npm start
```

### Error: "Network timeout"
- Verificar conexión a internet
- Comprobar firewall/proxy
- Intentar más tarde (CARU puede estar en mantenimiento)

### Datos no se actualizan
- CARU actualiza solo a las 00:00 y 12:00
- El sistema espera 5 minutos después de CARU
- Verificar logs para errores de conexión

## 🚀 Instalación en Producción

### Usando PM2 (Recomendado)

1. **Instalar PM2**:
   ```bash
   npm install -g pm2
   ```

2. **Iniciar con PM2**:
   ```bash
   pm2 start rio-server.js --name "rio-monitor"
   pm2 save
   pm2 startup
   ```

### Como Servicio de Sistema

#### En Linux (systemd)

1. **Crear archivo de servicio**:
   ```bash
   sudo nano /etc/systemd/system/rio-monitor.service
   ```

2. **Configurar servicio**:
   ```ini
   [Unit]
   Description=Rio Uruguay Monitor
   After=network.target
   
   [Service]
   Type=simple
   User=www-data
   WorkingDirectory=/path/to/rio-uruguay-monitor
   ExecStart=/usr/bin/node rio-server.js
   Restart=on-failure
   
   [Install]
   WantedBy=multi-user.target
   ```

3. **Habilitar servicio**:
   ```bash
   sudo systemctl enable rio-monitor
   sudo systemctl start rio-monitor
   ```

## 📊 Monitoreo y Mantenimiento

### Logs de Aplicación
Los logs incluyen:
- Horarios de actualización
- Errores de conexión
- Estado de cache
- Información de rendimiento

### Actualizaciones
Para actualizar a una nueva versión:
```bash
git pull origin main
npm install
npm start
```

## 🔒 Consideraciones de Seguridad

- El servidor solo obtiene datos públicos de CARU
- No se almacenan datos sensibles
- Las conexiones son HTTP (según especificación de CARU)
- Considera usar HTTPS en producción si es necesario

## 📞 Soporte

Si encuentras problemas durante la instalación:

1. **Verificar requisitos** del sistema
2. **Revisar logs** en la consola
3. **Consultar issues** en GitHub
4. **Crear nuevo issue** con detalles del error

---

¡Listo! Tu sistema de monitoreo del Río Uruguay debería estar funcionando correctamente. 🌊