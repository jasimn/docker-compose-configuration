#!/bin/bash

# MongoDB Docker Setup Initialization Script

set -e

echo "🚀 Initializing MongoDB Docker Setup..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "📝 Please update the .env file with your actual values before running docker-compose."
    exit 1
fi

# Load environment variables
source .env

# Create necessary directories
echo "📁 Creating directory structure..."
mkdir -p mongodb/backups
mkdir -p mongodb/config
mkdir -p mongo-express/config
mkdir -p scripts

# Set proper permissions
chmod +x scripts/*.sh 2>/dev/null || true

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "✅ Initialization complete!"
echo ""
echo "📝 Next steps:"
echo "1. Review and update the .env file if needed"
echo "2. Run: docker-compose up -d"
echo "3. Access Mongo Express at: http://localhost:${ME_HOST_PORT}"
echo "4. MongoDB connection string: mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@localhost:${MONGO_HOST_PORT}/admin"
