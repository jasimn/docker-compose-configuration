# MongoDB + Mongo-Express Docker Setup

A complete Docker Compose setup for MongoDB with Mongo-Express web interface.

## 🚀 Quick Start

1. **Create Project Directory**  
   ```bash
   mkdir mongodb-docker && cd mongodb-docker
---

Create docker-compose.yaml
Copy the content below into a file named docker-compose.yaml in your project directory.

Create .env File
Copy the content below into a file named .env in your project directory.

Run the Stack

bash
Copy code
docker compose up -d
Access Services:

MongoDB: localhost:27017

Web UI: http://localhost:8081

📁 File Structure
plaintext
Copy code
mongodb-docker/
├── docker-compose.yaml
├── .env
└── README.md
🐳 docker-compose.yaml
yaml
Copy code
version: '3.8'

services:
  mongodb:
    image: mongo:7.0
    container_name: mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASS}
    volumes:
      - mongo-data:/data/db
    ports:
      - "${MONGO_PORT}:27017"
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 10s
      timeout: 5s
      retries: 5

  mongo-express:
    image: mongo-express:1.0.0
    container_name: mongo-express
    restart: unless-stopped
    ports:
      - "${ME_PORT}:8081"
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: ${MONGO_USER}
      ME_CONFIG_MONGODB_ADMINPASSWORD: ${MONGO_PASS}
      ME_CONFIG_MONGODB_URL: mongodb://${MONGO_USER}:${MONGO_PASS}@mongodb:27017/
      ME_CONFIG_BASICAUTH_USERNAME: ${ME_USER}
      ME_CONFIG_BASICAUTH_PASSWORD: ${ME_PASS}
    depends_on:
      mongodb:
        condition: service_healthy

volumes:
  mongo-data:
⚙️ .env File
env
Copy code
# MongoDB Configuration
MONGO_USER=admin
MONGO_PASS=SuperSecret123!
MONGO_PORT=27017

# Mongo-Express Web UI
ME_USER=admin
ME_PASS=Express123!
ME_PORT=8081
📖 Description
What's Included:
MongoDB 7.0: NoSQL database with authentication

Mongo-Express: Web-based admin interface

Persistent Data: Data stored in Docker volume

Health Checks: Automatic service health monitoring

Security: Password protection for both services

Default Access:
MongoDB: mongodb://admin:SuperSecret123!@localhost:27017

Web UI: http://localhost:8081 (admin/Express123!)

🛠️ Useful Commands:
Start services

bash
Copy code
docker compose up -d
Stop services

bash
Copy code
docker compose down
View logs

bash
Copy code
docker compose logs -f
Access MongoDB shell

bash
Copy code
docker exec -it mongodb mongosh -u admin -p SuperSecret123!
✅ Features:
Persistent data storage

Automatic restarts

Health checks

Secure credentials

Easy to use
