-- create database (if not created by env) and use it
CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;

-- create users table if not exists
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- seed sample rows (id auto increments)
INSERT INTO users (name) VALUES ('Ram'), ('Krishan'), ('Hari');
