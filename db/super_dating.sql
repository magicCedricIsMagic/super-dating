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
	img TEXT,
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
  ('God')
;

INSERT INTO interests (name) 
VALUES
  ('Justice'),
  ('Weapons'),
  ('World saving'),
  ('Journalism'),
  ('Pizza'),
  ('Animals')
;

INSERT INTO heroes (name, bio, img, sex_id) 
VALUES
  ('Superman', NULL, NULL, 1),
  ('Catwoman', NULL, NULL, 2),
  ('Leonardo', NULL, NULL, 1)
;

INSERT INTO hero_types (hero_id, type_id) 
VALUES
  (1, 2),
  (2, 1),
  (3, 3)
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
  (3, 6)
;


/* Tests */


/* UPDATE types
SET name = 'Mutant'
WHERE id = 3; */

/* SELECT * FROM heroes
LEFT JOIN sexes ON heroes.sex_id = sexes.id; */

/* SELECT heroes.*, sexes.name as sex FROM heroes
LEFT JOIN sexes ON heroes.sex_id = sexes.id; */

/* SELECT heroes.*, interests.name as interest FROM heroes
LEFT JOIN hero_interests ON hero_interests.hero_id = heroes.id
LEFT JOIN interests ON interests.id = hero_interests.interest_id
WHERE heroes.id = 3;
; */



/* SELECT * FROM heroes;
SELECT * FROM interests;

ALTER TABLE heroes 
DROP CONSTRAINT FK_Hero_Sex;

ALTER TABLE heroes 
ADD CONSTRAINT FK_Hero_Sex
	FOREIGN KEY(sex_id)
	REFERENCES sexes(id)
	ON DELETE CASCADE;

DROP DATABASE super_dating;
CREATE DATABASE super_dating;
-- \c super_dating;

DELETE FROM heroes WHERE id = 2;
SELECT * FROM heroes;

SELECT * FROM hero_interests;

SELECT * FROM interests;
DELETE FROM interests WHERE id = 5; */