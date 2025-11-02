## docker-compose complete guide to setup mongodb and mango-express
docker-compose.yaml
```bash
   services:
  mongodb:
    image: mongo:7.0               # Official MongoDB 7.0
    container_name: mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASS}
    volumes:
      - mongo-data:/data/db        # Persists your data
    ports:
      - "${MONGO_PORT}:27017"      # Host access
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s

  mongo-express:
    image: mongo-express:1.0.0     # ← **OFFICIAL, EXISTING TAG** (no Alpine suffix needed)
    container_name: mongo-express
    restart: unless-stopped
    ports:
      - "${ME_PORT}:8081"
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: ${MONGO_USER}
      ME_CONFIG_MONGODB_ADMINPASSWORD: ${MONGO_PASS}
      ME_CONFIG_MONGODB_URL: mongodb://${MONGO_USER}:${MONGO_PASS}@mongodb:27017/
      ME_CONFIG_BASICAUTH_USERNAME: admin
      ME_CONFIG_BASICAUTH_PASSWORD: ExpressSecret123!
    depends_on:
      mongodb:
        condition: service_healthy   # Ensures Mongo is ready first
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8081"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mongo-data:
    name: mongo-lab02-data
---
## Access credential
mongo-express
url
```bash
   http://localhost:8081
username
```bash
   admin
password
```bash
   ExpressSecret123!
mongodb
 url
``` bash
    mongodb://localhost:27017
username
```bash
   admin
password
```bash
    SuperSecret123!
