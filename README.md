# 🌊 Rio Uruguay Monitor

![preview](https://github.com/user-attachments/assets/47ab8099-4b9e-4945-a415-18f218521e11)

Sistema de monitoreo en tiempo real de las alturas del Río Uruguay basado en datos oficiales de CARU (Comisión Administradora del Río Uruguay).

## 📊 Características

- **Datos en tiempo real** de todos los puertos del Río Uruguay
- **Interfaz web responsive** con visualización clara
- **API REST** para acceso programático a los datos
- **Actualización automática** siguiendo los horarios de CARU (00:00 y 12:00 UTC)
- **Cache inteligente** para optimizar rendimiento

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js >= 14.0.0
- npm >= 6.0.0

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/ChiNoZarini/rio-uruguay-monitor.git
cd rio-uruguay-monitor

# Instalar dependencias
npm install

# Iniciar el servidor
npm start
```

### Acceso
- **Interfaz web**: http://localhost:3000
- **API**: http://localhost:3000/api/rio-data
- **Datos CARU**: http://localhost:3000/caru-data.html

## 📡 API Endpoints

### GET /api/rio-data
Obtiene todos los datos actuales de alturas del río.

**Respuesta:**
```json
{
  "success": true,
  "lastUpdate": "2024-01-15T12:05:00.000Z",
  "data": [
    {
      "puerto": "Monte Caseros",
      "altura": "2.45",
      "fecha": "15/01/2024",
      "hora": "12:00"
    }
  ]
}
```

## 🗺️ Puertos Monitoreados

El sistema monitorea **20 puertos** a lo largo del Río Uruguay:

**Tramo Superior:**
- Monte Caseros
- Bella Unión
- Mocoretá
- Artigas
- Paso de los Libres
- Uruguayana

**Tramo Medio:**
- Federación / Federación Embalse
- Salto Grande (Arriba y Abajo)
- Salto
- Concordia
- Colón

**Tramo Inferior:**
- Concepción del Uruguay
- Puerto Yeruá
- Paysandú
- Fray Bentos
- Gualeguaychú
- San Javier
- Puerto Unzué

## ⚙️ Configuración

El archivo `config.json` contiene la configuración del sistema:

```json
{
  "port": 3000,
  "cacheTimeout": 43200000,
  "updateHours": [0, 12],
  "delayMinutes": 5
}
```

## 🔄 Actualización de Datos

- **Horarios CARU**: 00:00 y 12:00 UTC
- **Retraso del sistema**: 5 minutos después de cada actualización
- **Cache**: 12 horas entre actualizaciones programadas
- **Fuente**: Sitio web oficial de CARU

## 📱 Interfaces Disponibles

1. **rio-display.html** - Interfaz principal con servidor
2. **rio-display-standalone.html** - Versión independiente
3. **caru-data.html** - Datos específicos de CARU

## 🛠️ Tecnologías

- **Backend**: Node.js + Express
- **Web Scraping**: Axios + Cheerio
- **Frontend**: HTML5 + CSS3 + JavaScript
- **Programación**: node-cron
- **CORS**: Habilitado para uso en diferentes dominios

## 📄 Licencia

MIT License - Consulta el archivo LICENSE para más detalles.

## 🤝 Contribuir

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📞 Soporte

Para reportar problemas o solicitar funcionalidades, abre un [issue](https://github.com/ChiNoZarini/rio-uruguay-monitor/issues) en GitHub.

---

**Desarrollado por**: [ChiNoZarini](https://github.com/ChiNoZarini)  
**Fuente de datos**: [CARU - Comisión Administradora del Río Uruguay](https://www.caru.org.uy)
