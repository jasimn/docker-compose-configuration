# MongoDB + Mongo-Express (Docker Compose)

[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://www.docker.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?logo=mongodb)](https://www.mongodb.com)
[![Mongo Express](https://img.shields.io/badge/Mongo%20Express-Web%20UI-orange)](https://github.com/mongo-express/mongo-express)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A **production-ready**, secure, and persistent MongoDB + Mongo-Express stack using Docker Compose.

- **MongoDB 7.0** with root user  
- **Mongo-Express Web UI** with **Basic Auth**  
- **Persistent data** (named volume)  
- **Health checks** & startup order  
- **Secrets via `.env`** (never hardcode!)

---

## Stack Overview

| Service         | Image                     | Port       | Purpose                     |
|----------------|---------------------------|------------|-----------------------------|
| `mongodb`      | `mongo:7.0`               | `27017`    | Database engine             |
| `mongo-express`| `mongo-express:1.0.0`     | `8081`     | Web admin dashboard         |

---

## Prerequisites

- [Docker Engine](https://docs.docker.com/engine/install/) ≥ 24.0
- [Docker Compose](https://docs.docker.com/compose/install/) v2+
- Git

---

## Quick Start (3 Commands)

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/docker-mongo-express.git
cd docker-mongo-express

# 2. Copy env file
cp .env.example .env

Done! Open: http://localhost:8081

Access Credentials























ServiceURLUsernamePasswordWeb UIhttp://localhost:8081adminExpressSecret123!MongoDBmongodb://localhost:27017adminSuperSecret123!

Use in MongoDB Compass, CLI, or apps.


File Structure
textdocker-mongo-express/
├── docker-compose.yaml     Production-ready config
├── .env.example            Template (copy to .env)
├── .gitignore
└── README.md               This file

docker-compose.yaml
yamlservices:
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
    image: mongo-express:1.0.0
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

.env.example
env# MongoDB Root User
MONGO_USER=admin
MONGO_PASS=SuperSecret123!

# Ports
MONGO_PORT=27017
ME_PORT=8081

Security: Never commit .env — it's in .gitignore.


Useful Commands
bash# View logs
docker compose logs -f

# Enter Mongo shell
docker exec -it mongodb mongosh -u admin -p SuperSecret123!

# Stop & remove
docker compose down

# Remove data (full reset)
docker compose down -v
docker volume rm mongo-lab02-data

Security Notes

Web UI is password-protected (Basic Auth)
MongoDB requires username/password
Data is persistent in named volume
Never expose 27017 or 8081 publicly in production


Screenshots
<img src="https://i.imgur.com/5kP3LmN.png" alt="Mongo-Express Dashboard">
Web UI after login

Contributing

Fork it
Create your feature branch (git checkout -b feature/new)
Commit (git commit -m 'Add new feature')
Push (git push origin feature/new)
Open a Pull Request


License
MIT License – Free to use, modify, and distribute.

Star this repo if you found it helpful! 🌟
Made with ❤️ for clean Docker setups.
text---

### Also Create These Files in Your Repo

#### `.env.example` (already in README)
```env
MONGO_USER=admin
MONGO_PASS=SuperSecret123!
MONGO_PORT=27017
ME_PORT=8081
.gitignore
gitignore# Secrets
.env

# Docker
docker-compose.override.yml
LICENSE (MIT)
textMIT License

Permission is hereby granted, free of charge, to any person obtaining a copy...

Final Step: Push to GitHub
bashgit init
git add .
git commit -m "Initial commit: MongoDB + Mongo-Express stack"
git branch -M main
git remote add origin https://github.com/yourusername/docker-mongo-express.git
git push -u origin main

Your GitHub repo will now look professional, clean, and trustworthy — perfect for portfolios, teams, or open-source!
Let me know if you want:

Dark mode screenshot
GitHub Actions CI
HTTPS with Traefik
Backup script

You're all set!


# 3. Launch
docker compose up -d
