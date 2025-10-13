@echo off
echo 🌊 Probando archivo HTML standalone (sin servidor)
echo ================================================
echo.
echo ✅ Abriendo rio-display.html directamente...
echo 💡 Este archivo funcionará sin necesidad del servidor Node.js
echo 📊 Mostrará datos de demostración del Río Uruguay
echo.
echo Presiona cualquier tecla para abrir el archivo...
pause >nul

start "" "rio-display.html"

echo.
echo ✅ Archivo abierto en el navegador
echo 📝 El archivo debería mostrar:
echo    - Pantalla negra con datos del río
echo    - Alturas rotando cada 3 segundos
echo    - Texto "Datos de Demostración" abajo a la izquierda
echo.
pause