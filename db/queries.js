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
    SELECT heroes.*, sexes.name as sex_name FROM heroes
    JOIN sexes ON sexes.id = heroes.sex_id
    WHERE heroes.id = $1
  `, [id])
  return rows[0]
}

async function getHeroTypes(heroId) {
  const { rows } = await pool.query(`
    SELECT types.id, types.name FROM types
    JOIN hero_types ON hero_types.type_id = types.id
    WHERE hero_types.hero_id = $1;
  `, [heroId])
  return rows
}

async function getHeroInterests(heroId) {
  const { rows } = await pool.query(`
    SELECT interests.id, interests.name FROM interests
    JOIN hero_interests ON hero_interests.interest_id = interests.id
    WHERE hero_interests.hero_id = $1;
  `, [heroId])
  return rows
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
    INSERT INTO heroes (name, bio, photo, sex_id)
    VALUES ($1, $2, $3, $4)
  `, [hero.name, hero.bio, hero.photo, hero.sex])

  const { rows } = await pool.query(`
    SELECT id FROM heroes
    ORDER BY id DESC
    LIMIT 1;
  `)
  console.log("newHeroId", rows[0])
  return rows[0].id
}

async function updateHero(hero) {
	await pool.query(`
    UPDATE heroes
    SET name = $2 
      , bio = $3
      , photo = $4
      , sex_id = $5
    WHERE id = $1
  `, ["" + hero.id, hero.name, hero.bio, hero.photo, hero.sex])
  return hero.id
}


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
  getRandomHeroes,
  getHero,
  getHeroTypes,
  getHeroInterests,
  addHero,
  updateHero,
  deleteHero,
  deleteAllHeroes,
  getAllSexes,
  getAllTypes,
  getAllInterests,
  emptyDatabase,
}