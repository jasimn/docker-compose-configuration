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

## 🚀 Quick Start

\`\`\`bash
# 1. Clone the repo
git clone https://github.com/yourusername/docker-mongo-express.git
cd docker-mongo-express

# 2. Copy env file and edit credentials
cp .env.example .env

# 3. Launch services
docker compose up -d
\`\`\`

**Done!** Open: http://localhost:8081

---

## 📊 Stack Overview

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| \`mongodb\` | \`mongo:7.0\` | \`27017\` | Database engine |
| \`mongo-express\` | \`mongo-express:1.0.0\` | \`8081\` | Web admin dashboard |

---

## 🔐 Access Credentials

| Service | URL | Username | Password |
|---------|-----|----------|----------|
| Web UI | http://localhost:8081 | \`admin\` | \`ExpressSecret123!\` |
| MongoDB | \`mongodb://localhost:27017\` | \`admin\` | \`SuperSecret123!\` |

Use in MongoDB Compass, CLI, or your applications.

---

## 📁 File Structure

\`\`\`
docker-mongo-express/
├── docker-compose.yaml     # Production-ready config
├── .env.example            # Environment template
├── .gitignore
├── LICENSE
└── README.md               # This file
\`\`\`

---

## 🛠️ Useful Commands

\`\`\`bash
# View logs
docker compose logs -f

# Enter Mongo shell
docker exec -it mongodb mongosh -u admin -p SuperSecret123!

# Stop services
docker compose down

# Stop and remove data (full reset)
docker compose down -v
docker volume rm mongo-lab02-data
\`\`\`

---

## 🔒 Security Notes

- Web UI is password-protected (Basic Auth)
- MongoDB requires username/password
- Data is persistent in named volume
- Never expose 27017 or 8081 publicly in production

---

## 📸 Screenshots

*Mongo-Express Web UI after login*

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Star this repo if you found it helpful! 🌟**
---
Made with ❤️ for clean Docker setups.
## configuration file in yaml
