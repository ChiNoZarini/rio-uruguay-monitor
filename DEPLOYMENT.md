# 🚀 Guía de Despliegue

Esta guía te ayudará a desplegar el Sistema de Monitoreo del Río Uruguay en diferentes entornos.

## 📋 Opciones de Despliegue

### 1. 💻 Despliegue Local

#### Windows
```bash
# Configuración inicial
setup.bat

# Iniciar aplicación
start-server.bat
```

#### Linux/MacOS
```bash
# Dar permisos de ejecución
chmod +x setup.sh start-server.sh

# Configuración inicial
./setup.sh

# Iniciar aplicación
./start-server.sh
# O usar npm directamente
npm start
```

### 2. 🐳 Despliegue con Docker

#### Construcción básica
```bash
# Construir imagen
docker build -t rio-uruguay-monitor .

# Ejecutar contenedor
docker run -d -p 3000:3000 --name rio-monitor rio-uruguay-monitor
```

#### Con Docker Compose
```bash
# Despliegue básico
docker-compose up -d

# Despliegue con Nginx (producción)
docker-compose --profile production up -d
```

### 3. ☁️ Despliegue en la Nube

#### Heroku
```bash
# Instalar Heroku CLI
# Configurar proyecto
git init
heroku create tu-app-rio-uruguay

# Variables de entorno
heroku config:set NODE_ENV=production
heroku config:set PORT=3000

# Despliegue
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

#### Railway
```bash
# Conectar repositorio de GitHub
# Las variables de entorno se configuran en el dashboard
# Despliegue automático desde main branch
```

#### DigitalOcean App Platform
- Conectar repositorio de GitHub
- Configurar variables de entorno
- Despliegue automático

## ⚙️ Variables de Entorno

### Requeridas
```env
NODE_ENV=production
PORT=3000
```

### Opcionales
```env
CACHE_DURATION=600000
REQUEST_TIMEOUT=15000
DISPLAY_INTERVAL=3000
```

## 🔧 Configuración de Nginx (Producción)

```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔒 Consideraciones de Seguridad

### Para Producción
- Usar HTTPS (certificado SSL)
- Configurar firewall apropiado
- Actualizar dependencias regularmente
- Monitorear logs de seguridad

### Variables Sensibles
```env
# No incluir en repositorio
ADMIN_PASSWORD=tu_password_seguro
API_KEY=tu_api_key
```

## 📊 Monitoreo

### Health Checks
- Endpoint: `/health`
- Verificar: `curl http://localhost:3000/health`

### Logs
```bash
# Ver logs en tiempo real
docker-compose logs -f rio-uruguay-monitor

# Logs con timestamp
npm start 2>&1 | grep "$(date +%Y-%m-%d)"
```

### Métricas Básicas
- Puerto 3000 disponible
- Respuesta API < 5 segundos
- Actualización datos cada 10 minutos

## 🔄 Actualizaciones

### Proceso Seguro
```bash
# 1. Backup de configuración
cp config.json config.backup.json

# 2. Actualizar código
git pull origin main

# 3. Actualizar dependencias
npm install

# 4. Verificar sistema
npm run check

# 5. Reiniciar aplicación
pm2 restart rio-monitor
# O con Docker
docker-compose restart
```

## 🚨 Troubleshooting

### Problemas Comunes

#### Puerto ocupado
```bash
# Encontrar proceso usando puerto 3000
netstat -tulpn | grep :3000
# Matar proceso
kill -9 PID_NUMBER
```

#### Memoria insuficiente
```bash
# Verificar uso de memoria
free -m
# Aumentar swap si es necesario
```

#### Datos no se actualizan
- Verificar conectividad a CARU
- Revisar logs de errores
- Verificar cache_duration en configuración

## 📞 Soporte de Despliegue

Si encuentras problemas durante el despliegue:
1. Revisa los logs detallados
2. Verifica las variables de entorno
3. Confirma conectividad de red
4. Consulta la documentación específica del proveedor

---

### 💡 Tip: Para despliegues de producción, siempre usa HTTPS y considera un CDN para mejor rendimiento global.