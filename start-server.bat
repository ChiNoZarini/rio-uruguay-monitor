@echo off
echo 🌊 Iniciando Sistema de Monitoreo del Río Uruguay
echo ================================================
echo.

:: Verificar si Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Node.js no está instalado
    echo Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

:: Cambiar al directorio del proyecto
cd /d "%~dp0"

:: Verificar si las dependencias están instaladas
if not exist "node_modules" (
    echo 📦 Instalando dependencias...
    npm install
    if errorlevel 1 (
        echo ❌ Error instalando dependencias
        pause
        exit /b 1
    )
)

echo 🚀 Iniciando servidor...
echo.
echo 📊 La aplicación estará disponible en: http://localhost:3000
echo 🔗 API de datos en: http://localhost:3000/api/river-data
echo.
echo 💡 Presiona Ctrl+C para detener el servidor
echo ================================================
echo.

:: Abrir navegador después de un pequeño retraso
timeout /t 3 /nobreak >nul
start "" "http://localhost:3000"

:: Iniciar el servidor
npm start

pause