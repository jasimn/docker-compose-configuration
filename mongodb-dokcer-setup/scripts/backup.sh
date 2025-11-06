#!/bin/bash

# MongoDB Backup Script

set -e

# Load environment variables
source .env

BACKUP_DIR="./mongodb/backups"
BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)"
CONTAINER_NAME="mongodb"

echo "📦 Starting MongoDB backup..."

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Execute mongodump inside the container
docker exec "$CONTAINER_NAME" mongodump \
  --username "$MONGO_ROOT_USERNAME" \
  --password "$MONGO_ROOT_PASSWORD" \
  --authenticationDatabase admin \
  --out "/backups/$BACKUP_NAME"

# Copy backup to host
docker cp "$CONTAINER_NAME:/backups/$BACKUP_NAME" "$BACKUP_DIR/"

echo "✅ Backup completed: $BACKUP_DIR/$BACKUP_NAME"

# Optional: Clean up old backups (keep last 7 days)
find "$BACKUP_DIR" -name "backup_*" -type d -mtime +7 -exec rm -rf {} \; 2>/dev/null || true
