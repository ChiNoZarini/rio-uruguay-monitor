#!/bin/bash

echo "🌊 Iniciando Sistema de Monitoreo del Río Uruguay"
echo "================================================"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo "Por favor ejecuta ./setup.sh primero"
    exit 1
fi

# Cambiar al directorio del script
cd "$(dirname "$0")"

# Verificar si las dependencias están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    if ! npm install; then
        echo "❌ Error instalando dependencias"
        exit 1
    fi
fi

echo "🚀 Iniciando servidor..."
echo ""
echo "📊 La aplicación estará disponible en: http://localhost:3000"
echo "🔗 API de datos en: http://localhost:3000/api/river-data"
echo ""
echo "💡 Presiona Ctrl+C para detener el servidor"
echo "================================================"
echo ""

# Abrir navegador en segundo plano (si está disponible)
(sleep 3 && { 
    command -v xdg-open >/dev/null && xdg-open "http://localhost:3000" || 
    command -v open >/dev/null && open "http://localhost:3000" || 
    echo "💡 Abre manualmente: http://localhost:3000" 
}) &

# Iniciar el servidor
npm start