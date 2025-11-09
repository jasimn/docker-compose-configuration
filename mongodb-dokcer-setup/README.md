# Mongodb and Mongo express docker setup 
A complete docker compose setup for mongodb with mongo express and web interface
## Quick Start 
1.**clone and initialize**
### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) installed
- Git to clone this repository
  
### Clone the Repository
```bash
git clone https://github.com/jasimn/docker-compose-configuration.git
cd docker-compose-configuration
```
```bash
chmod +x scripts/init.sh
./scripts/init.sh
```
------------
2.## review environment variables:
```bash
vim .env 
```
update passwords and ports as needed
----------------------
3.start service
```bash 
docker-compose up --build -d
```
--------
4. access the services:
mongo-express:
```bash
mongo express:http://locahost:8081
```
mongodb:
```bash
mongodb://admin:yourpassword@localhost:27017
```


