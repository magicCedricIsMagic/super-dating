#! /usr/bin/env node
require("dotenv").config()

const { Client } = require("pg")

const SQL = `
CREATE TABLE IF NOT EXISTS sexes (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (100) NOT NULL
);

CREATE TABLE IF NOT EXISTS types (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (100) NOT NULL
);

CREATE TABLE IF NOT EXISTS interests (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255) NOT NULL
);

CREATE TABLE IF NOT EXISTS heroes (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (100) NOT NULL,
  bio TEXT,
	photo TEXT,
	sex_id INTEGER,
	CONSTRAINT FK_Hero_Sex FOREIGN KEY(sex_id) REFERENCES sexes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS hero_types (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  hero_id INTEGER,
  type_id INTEGER,
	CONSTRAINT FK_HeroType_Hero FOREIGN KEY(hero_id) REFERENCES heroes(id) ON DELETE CASCADE,
	CONSTRAINT FK_HeroType_Type FOREIGN KEY(type_id) REFERENCES types(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS hero_interests (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  hero_id INTEGER,
  interest_id INTEGER,
	CONSTRAINT FK_HeroInterest_Hero FOREIGN KEY(hero_id) REFERENCES heroes(id) ON DELETE CASCADE,
	CONSTRAINT FK_HeroInterest_Interest FOREIGN KEY(interest_id) REFERENCES interests(id) ON DELETE CASCADE
);

INSERT INTO sexes (name) 
VALUES
  ('Man'),
  ('Woman'),
  ('Unclear')
;

INSERT INTO types (name) 
VALUES
  ('Human'),
  ('Super human'),
  ('Mutant'),
  ('Robot'),
  ('God'),
  ('Monster'),
  ('Toy')
;

INSERT INTO interests (name) 
VALUES
  ('Justice'),
  ('Weapons'),
  ('World saving'),
  ('Journalism'),
  ('Pizza'),
  ('Animals'),
  ('Fire'),
  ('Traveling')
;

INSERT INTO heroes (name, bio, photo, sex_id) 
VALUES
  ('Superman', 'I''ll make you fly!', '/images/profiles/superman.png', 1),
  ('Catwoman', 'Meow', '/images/profiles/catwoman.png', 2),
  ('Leonardo', 'Cowabunga!', '/images/profiles/leonardo.png', 1),
  ('Batman', 'I hate clowns.', '/images/profiles/batman.png', 1),
  ('Michelangelo ', 'Let''s (not) share a pizza!', '/images/profiles/michelangelo.png', 1),
  ('Pikachu', 'Pika.', '/images/profiles/pikachu.avif', 1),
  ('Daenerys', 'I am not your little princess.', '/images/profiles/daenerys.png', 2),
  ('Lara Croft', 'I hope you have nothing against edgy girls', '/images/profiles/lara-croft.png', 2),
  ('Barbie', 'Do you guys ever think about dying?', '/images/profiles/barbie.png', 2)
;

INSERT INTO hero_types (hero_id, type_id) 
VALUES
  (1, 2),
  (2, 1),
  (3, 3),
  (4, 1),
  (5, 3),
  (6, 6),
  (7, 1),
  (8, 1),
  (9, 7)
;

INSERT INTO hero_interests (hero_id, interest_id) 
VALUES
  (1, 1),
  (1, 3),
  (1, 4),
  (2, 2),
  (2, 6),
  (3, 1),
  (3, 2),
  (3, 4),
  (3, 5),
  (3, 6),
  (4, 1),
  (4, 2),
  (4, 6),
  (5, 2),
  (5, 5),
  (6, 6),
  (7, 1),
  (7, 6),
  (7, 7),
  (8, 2),
  (8, 8),
  (9, 1),
  (9, 4),
  (9, 6),
  (9, 8)
;
`

async function main() {
  console.log("seeding…")
  const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log("done")
}

main()
