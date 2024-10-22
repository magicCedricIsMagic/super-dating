const pool = require("./pool")

async function getAllHeroes() {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM heroes
      ORDER BY id
    `)
    return rows
  }
  catch (error) {
    console.error("error", error)
  }
}

async function getHero(id) {
  try {
    const { rows } = await pool.query(`
      SELECT heroes.*, sexes.name AS sex_name FROM heroes
      JOIN sexes ON sexes.id = heroes.sex_id
      WHERE heroes.id = $1
    `, [id])
    return rows[0]
  }
  catch (error) {
    console.error("error", error)
  }
}

async function getHeroTypes(heroId) {
  try {
    const { rows } = await pool.query(`
      SELECT types.id, types.name FROM types
      JOIN hero_types ON hero_types.type_id = types.id
      WHERE hero_types.hero_id = $1
      ORDER BY types.name
    `, [heroId])
    return rows
  }
  catch (error) {
    console.error("error", error)
  }
}

async function getHeroInterests(heroId) {
  try {
    const { rows } = await pool.query(`
      SELECT interests.id, interests.name FROM interests
      JOIN hero_interests ON hero_interests.interest_id = interests.id
      WHERE hero_interests.hero_id = $1
      ORDER BY interests.name
    `, [heroId])
    return rows
  }
  catch (error) {
    console.error("error", error)
  }
}

async function getRandomHeroes(quantity) {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM heroes
      ORDER BY RANDOM()
      LIMIT $1
    `, [quantity])
    return rows
  }
  catch (error) {
    console.error("error", error)
  }
}

async function getHeroesByType(typeId) {
  try {
    const { rows } = await pool.query(`
      SELECT heroes.* FROM heroes
      JOIN hero_types ON heroes.id = hero_types.hero_id
      WHERE hero_types.type_id = $1
    `, [typeId])
    return rows
  }
  catch (error) {
    console.error("error", error)
  }
}
async function getHeroesByInterest(interestId) {
  try {
    const { rows } = await pool.query(`
      SELECT heroes.* FROM heroes
      JOIN hero_interests ON heroes.id = hero_interests.hero_id
      WHERE hero_interests.interest_id = $1
    `, [interestId])
    return rows
  }
  catch (error) {
    console.error("error", error)
  }
}

async function addHero(hero) {
  try {
    await pool.query(`
      INSERT INTO heroes (name, bio, photo, sex_id)
      VALUES ($1, $2, $3, $4)
    `, [hero.name, hero.bio, hero.photo, hero.sex])

    const { rows } = await pool.query(`
      SELECT id FROM heroes
      ORDER BY id DESC
      LIMIT 1
    `)
    hero.id =  rows[0].id

    await updateHeroTypes(hero)
    await updateHeroInterests(hero)

    return hero.id
  }
  catch (error) {
    console.error("error", error)
  }
}

async function updateHero(hero) {
  try {
    await pool.query(`
      UPDATE heroes
      SET name = $2 
        , bio = $3
        , photo = $4
        , sex_id = $5
      WHERE id = $1
    `, [hero.id, hero.name, hero.bio, hero.photo, hero.sex])

    await updateHeroTypes(hero)
    await updateHeroInterests(hero)

    return hero.id
  }
  catch (error) {
    console.error("error", error)
  }
}

async function updateHeroTypes(hero) {
  try {
    const currentHeroTypes = (
      await getHeroTypes(hero.id)
    ).map(type => "" + type.id)
    const newHeroTypes = hero.types
    const heroTypesToDelete =  []
    for (const currentHeroType of currentHeroTypes) {
      if (!newHeroTypes.includes(currentHeroType)) {
        heroTypesToDelete.push(currentHeroType)
      }
    }
    const heroTypesToAdd =  []
    for (const newHeroType of newHeroTypes) {
      if (!currentHeroTypes.includes(newHeroType)) {
        heroTypesToAdd.push(newHeroType)
      }
    }
    if (heroTypesToDelete.length) {
      await pool.query(`
        DELETE FROM hero_types
        WHERE hero_id = $1  
        AND type_id = ANY($2)
      `, [hero.id, heroTypesToDelete])
    }
    if (heroTypesToAdd.length) {
      for (const newHeroType of heroTypesToAdd) {
        await pool.query(`
          INSERT INTO hero_types (hero_id, type_id)
          VALUES ($1, $2)
        `, [hero.id, newHeroType])
      }
    }
  }
  catch (error) {
    console.error("error", error)
  }
}

async function updateHeroInterests(hero) {
  try {
    const currentHeroInterests = (
      await getHeroInterests(hero.id)
    ).map(interest => "" + interest.id)
    const newHeroInterests = hero.interests
    const heroInterestsToDelete =  []
    for (const currentHeroInterest of currentHeroInterests) {
      if (!newHeroInterests.includes(currentHeroInterest)) {
        heroInterestsToDelete.push(currentHeroInterest)
      }
    }
    const heroInterestsToAdd =  []
    for (const newHeroInterest of newHeroInterests) {
      if (!currentHeroInterests.includes(newHeroInterest)) {
        heroInterestsToAdd.push(newHeroInterest)
      }
    }
    if (heroInterestsToDelete.length) {
      await pool.query(`
        DELETE FROM hero_interests
        WHERE hero_id = $1  
        AND interest_id = ANY($2)
      `, [hero.id, heroInterestsToDelete])
    }
    if (heroInterestsToAdd.length) {
      for (const newHeroInterest of heroInterestsToAdd) {
        await pool.query(`
          INSERT INTO hero_interests (hero_id, interest_id)
          VALUES ($1, $2)
        `, [hero.id, newHeroInterest])
      }
    }
  }
  catch (error) {
    console.error("error", error)
  }
}


async function deleteHero(id) {
  try {
    await pool.query(`
      DELETE FROM heroes 
      WHERE id = $1
    `, [id])
  }
  catch (error) {
    console.error("error", error)
  }
}

async function deleteAllHeroes() {
  try {
    await pool.query(`
      DELETE FROM heroes
    `)
  }
  catch (error) {
    console.error("error", error)
  }
}

async function getAllSexes() {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM sexes
      ORDER BY id
    `)
    return rows
  }
  catch (error) {
    console.error("error", error)
  }
}



async function getAllTypes() {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM types
      ORDER BY name
    `)
    return rows
  }
  catch (error) {
    console.error("error", error)
  }
}

async function getType(typeId) {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM types
      WHERE id = $1
    `, [typeId])
    return rows[0]
  }
  catch (error) {
    console.error("error", error)
  }
}

async function addType(type) {
  try {
    await pool.query(`
      INSERT INTO types (name)
      VALUES ($1)
    `, [type.name])
  }
  catch (error) {
    console.error("error", error)
  }
}

async function updateType(type) {
  try {
    await pool.query(`
      UPDATE types
      SET name = $2 
      WHERE id = $1
    `, [type.id, type.name])
  }
  catch (error) {
    console.error("error", error)
  }
}

async function deleteType(id) {
  try {
    await pool.query(`
      DELETE FROM types 
      WHERE id = $1
    `, [id])
  }
  catch (error) {
    console.error("error", error)
  }
}



async function getAllInterests() {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM interests
      ORDER BY name
    `)
    return rows
  }
  catch (error) {
    console.error("error", error)
  }
}

async function getInterest(interestId) {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM interests
      WHERE id = $1
    `, [interestId])
    return rows[0]
  }
  catch (error) {
    console.error("error", error)
  }
}











async function emptyDatabase() {
  try {
    await pool.query(`
      DELETE FROM heroes;
      DELETE FROM sexes;
      DELETE FROM types;
      DELETE FROM interests;
    `)
  }
  catch (error) {
    console.error("error", error)
  }
}


module.exports = {
  getAllHeroes,
  getRandomHeroes,
  getHeroesByType,
  getHeroesByInterest,
  getHero,
  getHeroTypes,
  getHeroInterests,
  addHero,
  updateHero,
  deleteHero,
  deleteAllHeroes,
  getAllSexes,
  getAllTypes,
  getType,
  addType,
  updateType,
  deleteType,
  getAllInterests,
  getInterest,
  emptyDatabase,
}