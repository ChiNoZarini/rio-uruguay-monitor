@echo off
echo 🌊 Configuración inicial del Sistema de Monitoreo del Río Uruguay
echo ================================================================
echo.

:: Verificar si Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Node.js no está instalado
    echo.
    echo 📥 Descarga Node.js desde: https://nodejs.org/
    echo 💡 Asegúrate de instalar la versión LTS (recomendada)
    echo.
    pause
    start "" "https://nodejs.org/"
    exit /b 1
) else (
    echo ✅ Node.js detectado
    node --version
)

:: Cambiar al directorio del proyecto
cd /d "%~dp0"

:: Instalar dependencias
echo.
echo 📦 Instalando dependencias del proyecto...
npm install
if errorlevel 1 (
    echo ❌ Error instalando dependencias
    echo 💡 Verifica tu conexión a internet e intenta nuevamente
    pause
    exit /b 1
)

:: Crear archivo de configuración si no existe
if not exist "config.json" (
    echo 📝 Creando archivo de configuración...
    copy "config.example.json" "config.json" >nul
    echo ✅ Archivo config.json creado desde plantilla
)

:: Verificar sistema
echo.
echo 🔍 Verificando configuración del sistema...
npm run check
if errorlevel 1 (
    echo ⚠️  Se detectaron algunos problemas. Revisa los logs anteriores.
) else (
    echo ✅ Sistema verificado correctamente
)

echo.
echo ================================================================
echo ✅ ¡Configuración completada exitosamente!
echo.
echo 🚀 Próximos pasos:
echo    1. Ejecuta 'start-server.bat' para usar con datos reales
echo    2. O abre 'rio-display.html' para modo demostración
echo.
echo 📚 Documentación completa en README.md
echo ================================================================
echo.
pause