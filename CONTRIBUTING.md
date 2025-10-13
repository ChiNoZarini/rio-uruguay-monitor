# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al Sistema de Monitoreo del Río Uruguay! 

## 📋 Código de Conducta

Este proyecto sigue el [Código de Conducta del Contribuyente](https://www.contributor-covenant.org/). Al participar, se espera que mantengas este código.

## 🚀 Cómo Contribuir

### 1. Reportar Bugs
- Usa el [issue tracker](https://github.com/TU_USUARIO/rio-uruguay-monitor/issues)
- Verifica que el bug no haya sido reportado antes
- Incluye información detallada sobre el problema
- Proporciona pasos para reproducir el bug

### 2. Sugerir Mejoras
- Abre un issue con la etiqueta "enhancement"
- Explica claramente la funcionalidad sugerida
- Proporciona ejemplos de uso si es posible

### 3. Contribuir con Código

#### Prerequisitos
- Node.js 14+
- Git
- Conocimiento básico de JavaScript/HTML/CSS

#### Proceso
1. **Fork** el repositorio
2. **Clona** tu fork localmente
   ```bash
   git clone https://github.com/TU_USUARIO/rio-uruguay-monitor.git
   cd rio-uruguay-monitor
   ```

3. **Crea una rama** para tu feature
   ```bash
   git checkout -b feature/mi-nueva-funcionalidad
   ```

4. **Instala dependencias**
   ```bash
   npm install
   ```

5. **Desarrolla** tu funcionalidad
6. **Prueba** tus cambios
   ```bash
   npm run check
   npm start
   ```

7. **Commit** tus cambios
   ```bash
   git add .
   git commit -m "feat: descripción clara del cambio"
   ```

8. **Push** a tu fork
   ```bash
   git push origin feature/mi-nueva-funcionalidad
   ```

9. **Abre un Pull Request**

## 📝 Estándares de Código

### Estilo de Código
- Usar 4 espacios para indentación
- Nombres de variables en camelCase
- Comentarios claros y concisos
- Código en español para consistencia

### Convenciones de Commits
Usar [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `docs:` cambios en documentación
- `style:` cambios de formato
- `refactor:` refactorización de código
- `test:` agregar o modificar tests
- `chore:` tareas de mantenimiento

### Estructura de Archivos
```
src/
├── rio-server.js           # Servidor principal
├── rio-display.html        # Interfaz de usuario
├── check-system.js         # Utilidades de diagnóstico
└── config.json             # Configuración
```

## 🧪 Testing

Antes de enviar un PR:
1. Ejecuta `npm run check` para verificar el sistema
2. Prueba en modo standalone y servidor
3. Verifica que funcione en diferentes navegadores
4. Asegúrate de que no rompe funcionalidades existentes

## 📖 Documentación

Si tu contribución requiere cambios en la documentación:
- Actualiza el README.md
- Documenta nuevas configuraciones
- Incluye ejemplos de uso
- Mantén la documentación en español

## ❓ Preguntas

Si tienes preguntas sobre el desarrollo:
- Abre un issue con la etiqueta "question"
- Revisa la [Wiki del proyecto](https://github.com/TU_USUARIO/rio-uruguay-monitor/wiki)
- Participa en [Discusiones](https://github.com/TU_USUARIO/rio-uruguay-monitor/discussions)

## 🏷️ Tipos de Contribución Bienvenidas

- 🐛 **Corrección de bugs**
- ✨ **Nuevas funcionalidades**
- 📚 **Mejoras en documentación**
- 🎨 **Mejoras en UI/UX**
- ⚡ **Optimizaciones de rendimiento**
- 🔧 **Herramientas de desarrollo**
- 🧪 **Tests automatizados**
- 🌐 **Internacionalización**
- 📱 **Mejoras de responsividad**
- 🔒 **Mejoras de seguridad**

## 🎉 Reconocimientos

Todos los contribuyentes serán reconocidos en:
- README principal
- Archivo AUTHORS
- Release notes
- Página de contribuyentes

¡Gracias por ayudar a mejorar el Sistema de Monitoreo del Río Uruguay! 🌊