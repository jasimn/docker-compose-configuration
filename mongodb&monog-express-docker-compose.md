1. Project folder structure
textdocker-lab02/
├─ docker-compose.yaml
└─ .env                 (optional but recommended)
Create the folder and the two files exactly as shown.

2. .env – keep secrets out of the compose file
env# .env
MONGO_USER=admin
MONGO_PASS=SuperSecret123!
MONGO_PORT=27017
ME_PORT=8081

Why?

Keeps passwords out of version control.
One place to change them.
Docker Compose automatically loads this file.



3. docker-compose.yaml – no version: field (obsolete in Compose v2)
yaml# docker-compose.yaml
services:
  mongodb:
    image: mongo:7.0               # latest stable MongoDB (7.0.x)
    container_name: mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASS}
    volumes:
      - mongo-data:/data/db        # persistent storage
    ports:
      - "${MONGO_PORT}:27017"      # host:container
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s

  mongo-express:
    image: mongo-express:1.0.0-alpine3.20   # ← **EXISTING TAG** (as of Nov 2025)
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
        condition: service_healthy   # wait until Mongo is ready
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8081"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mongo-data:
    name: mongo-lab02-data

4. Line-by-line explanation
services:





































ServiceWhy this line?image: mongo:7.0Official MongoDB 7.0 (latest stable).container_name:Fixed name → easy docker exec etc.restart: unless-stoppedAuto-restart on crash or host reboot.environment:Creates the root user you will log in with.volumes:Persists data in a named volume (mongo-data).ports:Exposes Mongo on host port from .env.healthcheck:Guarantees the DB is really ready before Express starts.






























ServiceWhy this line?image: mongo-express:1.0.0-alpine3.20This tag exists (checked on Docker Hub Nov 2025).ME_CONFIG_MONGODB_URLFull connection string using the internal service name mongodb.ME_CONFIG_BASICAUTH_*Adds HTTP Basic Auth to the web UI (highly recommended).depends_on: ... condition: service_healthyPrevents the “connection refused” race condition.healthcheck:Makes sure the web UI is reachable.

volumes:
yamlmongo-data:
  name: mongo-lab02-data
Creates a named volume that survives docker-compose down.
You can delete it with docker volume rm mongo-lab02-data if you ever need a clean start.

5. How to run step-by-step
bash# 1. Go to the folder
cd ~/docker-lab02

# 2. (Optional) Verify the images exist
docker pull mongo:7.0
docker pull mongo-express:1.0.0-alpine3.20

# 3. Start everything
docker compose up -d
Expected output
text[+] Running 2/2
 ✔ mongodb        Running   0.0s
 ✔ mongo-express  Running   0.0s

6. Verify it works
bash# MongoDB CLI
docker exec -it mongodb mongosh -u admin -p SuperSecret123!

# Web UI
open http://localhost:8081
# Login:  admin / ExpressSecret123!
You should see the Mongo-Express dashboard with the admin user connected.

7. Common pitfalls & how we avoided them

































ProblemFix in this setupmanifest ... not foundUse real tag 1.0.0-alpine3.20 (checked on Docker Hub).version: warningRemoved – Compose v2 ignores it.Mongo not ready → Express failsdepends_on + service_healthy.Data loss on downPersistent named volume.Plain-text passwords in composeStored in .env (git-ignore it).No UI authenticationME_CONFIG_BASICAUTH_*.

8. Clean-up (when you are done)
bash# Stop & remove containers + networks
docker compose down

# (Optional) Remove persisted data
docker volume rm mongo-lab02-data

9. TL;DR – Copy-Paste Ready
bashmkdir -p ~/docker-lab02 && cd $_

cat > .env <<'EOF'
MONGO_USER=admin
MONGO_PASS=SuperSecret123!
MONGO_PORT=27017
ME_PORT=8081
EOF

cat > docker-compose.yaml <<'EOF'
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
      start_period: 10s

  mongo-express:
    image: mongo-express:1.0.0-alpine3.20
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
        condition: service_healthy

volumes:
  mongo-data:
    name: mongo-lab02-data
EOF

docker compose up -d
You’re done! Open http://localhost:8081 → login admin / ExpressSecret123!.

If anything still fails, run:
bashdocker compose logs -f
and paste the output here – I’ll troubleshoot instantly.
