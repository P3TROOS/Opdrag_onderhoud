-- Starter schema — example only. Replace with your own DDL for submission.
--
-- Submit a complete schema.sql: every table, index, and constraint your app uses.
-- It must run on an empty database with no errors. Keep data out of this file;
-- optional seed data can go in a separate dump (see docs/submission-guide.md).
--
-- If you run this file by hand (without scripts/setup.js), create the database
-- first, then USE it, or uncomment the lines below.

CREATE DATABASE IF NOT EXISTS pokemon_spanbouer
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pokemon_spanbouer;

CREATE TABLE IF NOT EXISTS users (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email         VARCHAR(255)    NOT NULL,
  password_hash VARCHAR(255)    NOT NULL,
  created_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Add your tables below. Document design choices in docs/architecture.md.

CREATE TABLE IF NOT EXISTS rugsak (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id       BIGINT UNSIGNED NOT NULL,
  pokemon_id    INT             NOT NULL,
  pokemon_name  VARCHAR(255)    NOT NULL,
  pokemon_sprite VARCHAR(255)    NOT NULL,
  created_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_backpack_user_pokemon (user_id, pokemon_id),
  KEY idx_backpack_user (user_id),
  CONSTRAINT fk_backpack_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS team (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id       BIGINT UNSIGNED NOT NULL,
  pokemon_id    INT             NOT NULL,
  pokemon_name  VARCHAR(255)    NOT NULL,
  pokemon_sprite VARCHAR(255)    NOT NULL,
  created_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_team_user_pokemon (user_id, pokemon_id),
  KEY idx_team_user (user_id),
  CONSTRAINT fk_team_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

