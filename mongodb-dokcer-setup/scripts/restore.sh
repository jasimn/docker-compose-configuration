#!/bin/bash

# MongoDB Restore Script

set -e

# Load environment variables
source .env

BACKUP_DIR="./mongodb/backups"
CONTAINER_NAME="mongodb"

if [ -z "$1" ]; then
    echo "❌ Please specify backup directory name"
    echo "Usage: $0 <backup_directory>"
    echo "Available backups:"
    ls -l "$BACKUP_DIR" | grep "^d" | awk '{print $9}'
    exit 1
fi

BACKUP_NAME="$1"
BACKUP_PATH="$BACKUP_DIR/$BACKUP_NAME"

if [ ! -d "$BACKUP_PATH" ]; then
    echo "❌ Backup directory not found: $BACKUP_PATH"
    exit 1
fi

echo "🔄 Restoring MongoDB from backup: $BACKUP_NAME"

# Copy backup to container
docker cp "$BACKUP_PATH" "$CONTAINER_NAME:/backups/restore/"

# Execute mongorestore
docker exec "$CONTAINER_NAME" mongorestore \
  --username "$MONGO_ROOT_USERNAME" \
  --password "$MONGO_ROOT_PASSWORD" \
  --authenticationDatabase admin \
  "/backups/restore/$BACKUP_NAME"

# Clean up
docker exec "$CONTAINER_NAME" rm -rf "/backups/restore"

echo "✅ Restore completed successfully!"
