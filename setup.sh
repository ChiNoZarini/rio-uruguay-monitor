#!/bin/bash

echo "🌊 Configuración inicial del Sistema de Monitoreo del Río Uruguay"
echo "================================================================"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo ""
    echo "📥 Instala Node.js desde: https://nodejs.org/"
    echo "💡 O usa un gestor de versiones como nvm:"
    echo "   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo "   nvm install --lts"
    echo ""
    exit 1
else
    echo "✅ Node.js detectado: $(node --version)"
fi

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm no está disponible"
    exit 1
else
    echo "✅ npm detectado: $(npm --version)"
fi

# Cambiar al directorio del script
cd "$(dirname "$0")"

# Instalar dependencias
echo ""
echo "📦 Instalando dependencias del proyecto..."
if npm install; then
    echo "✅ Dependencias instaladas correctamente"
else
    echo "❌ Error instalando dependencias"
    echo "💡 Verifica tu conexión a internet e intenta nuevamente"
    exit 1
fi

# Crear archivo de configuración si no existe
if [ ! -f "config.json" ]; then
    echo "📝 Creando archivo de configuración..."
    cp "config.example.json" "config.json"
    echo "✅ Archivo config.json creado desde plantilla"
fi

# Verificar sistema
echo ""
echo "🔍 Verificando configuración del sistema..."
if npm run check; then
    echo "✅ Sistema verificado correctamente"
else
    echo "⚠️  Se detectaron algunos problemas. Revisa los logs anteriores."
fi

# Hacer ejecutables los scripts
chmod +x start-server.sh 2>/dev/null || true
chmod +x setup.sh 2>/dev/null || true

echo ""
echo "================================================================"
echo "✅ ¡Configuración completada exitosamente!"
echo ""
echo "🚀 Próximos pasos:"
echo "   1. Ejecuta 'npm start' para iniciar el servidor"
echo "   2. O abre 'rio-display.html' en tu navegador para modo demostración"
echo ""
echo "📚 Documentación completa en README.md"
echo "================================================================"
echo ""