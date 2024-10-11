const pool = require("./pool")

async function getAllHeroes() {
  const { rows } = await pool.query(`
    SELECT * FROM heroes
    ORDER BY id
  `)
  return rows
}

async function getHero(id) {
  const { rows } = await pool.query(`
    SELECT * FROM heroes
    WHERE id = $1
  `, [id])
  return rows[0]
}

async function getRandomHeroes(quantity) {
  const { rows } = await pool.query(`
    SELECT * FROM heroes
    ORDER BY RANDOM()
    LIMIT $1
  `, [quantity])
  return rows
}

async function addHero(hero) {
	await pool.query(`
    INSERT INTO heroes (name, bio, sex_id)
    VALUES ($1, $2, $3)
  `, [hero.name, hero.bio, hero.sex])
}

/* async function updateHero(hero) {
	await pool.query(`
    UPDATE heroes
    SET text = $2, name = $3
    WHERE id = $1
  `, ["" + hero.id, hero.text, hero.name])
} */


async function deleteHero(id) {
	await pool.query(`
    DELETE FROM heroes WHERE id = $1
  `, [id])
}

async function deleteAllHeroes() {
	await pool.query(`
    DELETE FROM heroes
  `)
}

async function getAllSexes() {
  const { rows } = await pool.query(`
    SELECT * FROM sexes
    ORDER BY id
  `)
  return rows
}
async function getAllTypes() {
  const { rows } = await pool.query(`
    SELECT * FROM types
    ORDER BY id
  `)
  return rows
}
async function getAllInterests() {
  const { rows } = await pool.query(`
    SELECT * FROM interests
    ORDER BY name
  `)
  return rows
}

async function emptyDatabase() {
	await pool.query(`
    DELETE FROM heroes;
    DELETE FROM sexes;
    DELETE FROM types;
    DELETE FROM interests;
  `)
}


module.exports = {
  getAllHeroes,
  getHero,
  getRandomHeroes,
  addHero,
  /* updateHero, */
  deleteHero,
  deleteAllHeroes,
  getAllSexes,
  getAllTypes,
  getAllInterests,
  emptyDatabase,
}