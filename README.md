# 🌊 Rio Uruguay Monitor

![preview](https://github.com/user-attachments/assets/47ab8099-4b9e-4945-a415-18f218521e11)

Sistema de monitoreo en tiempo real de las alturas del Río Uruguay con datos oficiales de CARU (Comisión Administradora del Río Uruguay).

## 📋 Descripción

Este proyecto proporciona una interfaz web moderna y responsive para monitorear las alturas hidrométricas del Río Uruguay en múltiples puertos, desde Monte Caseros hasta Nueva Palmira. Los datos se obtienen directamente del sistema oficial de CARU y se actualizan automáticamente cada 12 horas.

## ✨ Características

- 🔄 **Actualización automática**: Datos sincronizados con CARU a las 00:05 y 12:05
- 📱 **Diseño responsive**: Optimizado para dispositivos móviles y desktop
- 🎨 **Interfaz moderna**: Dashboard con temas personalizables
- 📊 **Visualización clara**: Estados visuales por rangos de altura
- ⚡ **Cache inteligente**: Optimización de rendimiento con cache de 12 horas
- 🔍 **Múltiples puertos**: Monitoreo de 16 puertos a lo largo del río
- 🌍 **Cobertura trinacional**: Argentina, Uruguay y Brasil

## 🚀 Instalación

### Prerrequisitos

- Node.js >= 14.0.0
- npm >= 6.0.0

### Instalación rápida

```bash
# Clonar el repositorio
git clone https://github.com/ChiNoZarini/rio-uruguay-monitor.git
cd rio-uruguay-monitor

# Instalar dependencias
npm install

# Iniciar el servidor
npm start
```

### Instalación en Windows (archivo batch)

```bash
# Ejecutar el archivo start.bat
start.bat
```

![preview2](https://github.com/user-attachments/assets/c43e3406-2336-4ec1-a1fc-8b1029b55724)

## 📖 Uso

1. **Iniciar el servidor**:
   ```bash
   npm start
   ```

2. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```

3. **Ver datos**:
   - El dashboard muestra automáticamente las alturas de todos los puertos
   - Los datos se actualizan automáticamente cada 12 horas
   - El estado visual indica los niveles de alerta por colores

## 🔧 Configuración

El archivo `config.json` permite personalizar:

- **Puerto del servidor** (por defecto: 3000)
- **Intervalos de actualización**
- **Horarios de sincronización con CARU**
- **Configuración de puertos monitoreados**
- **Temas visuales**

### Ejemplo de configuración:

```json
{
  "server": {
    "port": 3000,
    "cacheDuration": 43200000
  },
  "scheduler": {
    "caruUpdateHours": [0, 12],
    "updateDelayMinutes": 5
  }
}
```

## 🏠 Puertos Monitoreados

El sistema monitorea 16 puertos estratégicos:

### Argentina 🇦🇷
- Monte Caseros (Corrientes)
- Paso de los Libres (Corrientes)
- Concordia (Entre Ríos)
- Colón (Entre Ríos)
- Concepción del Uruguay (Entre Ríos)
- Puerto Yeruá (Entre Ríos)
- Constitución (Entre Ríos)
- San Javier (Entre Ríos)
- Puerto Unzué (Entre Ríos)
- Gualeguaychú (Entre Ríos)

### Uruguay 🇺🇾
- Bella Unión
- Artigas
- Salto
- Paysandú
- Fray Bentos

### Brasil 🇧🇷
- Uruguayana

## 📡 API

### Endpoints disponibles

- `GET /api/data` - Obtener datos actuales de todos los puertos
- `GET /api/status` - Estado del sistema y última actualización
- `GET /` - Dashboard principal (interfaz web)

### Ejemplo de respuesta API:

```json
{
  "data": [
    {
      "puerto": "COLÓN",
      "altura": "2.45",
      "fecha": "2024-01-15",
      "hora": "12:00",
      "region": "Entre Ríos"
    }
  ],
  "lastUpdate": "2024-01-15T12:05:00.000Z",
  "nextUpdate": "2024-01-16T00:05:00.000Z"
}
```

## 🛠️ Scripts disponibles

```bash
# Iniciar en producción
npm start

# Iniciar en desarrollo (con nodemon)
npm run dev

# En Windows - inicio automático
start.bat
```

## 📁 Estructura del proyecto

```
rio-uruguay-monitor/
├── config.json           # Configuración del sistema
├── package.json          # Dependencias y metadata
├── rio-server.js         # Servidor principal
├── rio-display.html      # Dashboard web
├── start.bat            # Script de inicio para Windows
└── README.md            # Este archivo
```

## 🔄 Funcionamiento

1. **Sincronización**: CARU actualiza datos a las 00:00 y 12:00
2. **Recolección**: Servidor obtiene datos a las 00:05 y 12:05
3. **Cache**: Datos se mantienen en cache por 12 horas
4. **Visualización**: Dashboard muestra información en tiempo real

## 📊 Estados Visuales

- 🟢 **Verde**: Altura normal
- 🟡 **Amarillo**: Altura de precaución
- 🟠 **Naranja**: Altura de alerta
- 🔴 **Rojo**: Altura crítica

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 🙏 Reconocimientos

- **CARU** - Por proporcionar los datos oficiales del Río Uruguay
- **Comisión Administradora del Río Uruguay** - Fuente oficial de datos

## 📞 Soporte

Para reportar bugs o solicitar features:
- 🐛 **Issues**: [GitHub Issues](https://github.com/ChiNoZarini/rio-uruguay-monitor/issues)

## 🔗 Enlaces útiles

- [CARU Oficial](http://www.caru.org.uy/)

---

⭐ Si este proyecto te resulta útil, ¡dale una estrella en GitHub!

**Desarrollado por**: [ChiNoZarini](https://github.com/ChiNoZarini)  
**Fuente de datos**: [CARU - Comisión Administradora del Río Uruguay](https://www.caru.org.uy)
