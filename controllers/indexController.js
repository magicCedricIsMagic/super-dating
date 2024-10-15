const { body, validationResult } = require("express-validator")
const { sanitize } = require("../utils/texts")
const CustomError = require("../utils/CustomError")
const db = require("../db/queries")


function getView(req, res, next, params) {
	res.render(params.route.file, {
		title: params.route.title,
		links: params.routes,
	})
}

function getErrorView(err, req, res, next, params) {
	res.render("error", {
		title: `Erreur ${err.statusCode}`,
		error: err,
		links: params.routes,
	})
}

async function getHomeView(req, res, next, params) {
	// const heroes = await db.getAllHeroes()
	const heroes = await db.getRandomHeroes(3)
	res.render(params.route.file, {
		title: params.route.title,
		links: params.routes,
		heroes,
	})
}


async function getHeroView(req, res, next, params) {
	const hero = await db.getHero(req.params.id)
	const types = await db.getHeroTypes(req.params.id)
	const interests = await db.getHeroInterests(req.params.id)
	hero.types = types
	hero.interests = interests
	res.render("hero", {
		title: hero.name,
		links: params.routes,
		hero,
	})
}

async function getNewProfileView(req, res, next, params) {
	const sexes = await db.getAllSexes()
	const types = await db.getAllTypes()
	const interests = await db.getAllInterests()

	res.render(params.route.file, {
		title: params.route.title,
		links: params.routes,
		hero: null,
		sexes,
		types,
		interests,
	})
}

const validateProfile = [
	body("name")
		.isLength({ min: 1, max: 100 })
		.withMessage(`Name must be between 1 and 100 caracters`),
	/* 	body("sex")
			.isInt()
			.withMessage(`Sex must be Int`)
			.isLength({ min: 1, max: 1 })
			.withMessage(`Sex must be of 1 character`) */
]
const addNewProfile = [
	validateProfile,
	(req, res, next) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			let errorsStringArray = []
			for (const error of errors.errors) {
				errorsStringArray.push(error.msg)
			}
			throw new CustomError(
				"Form error",
				errorsStringArray.join(' | '),
				400
			)
		}
		else {
			(async () => {
				// const postId = parseInt(req.params.id)
				const hero = {
					name: sanitize(req.body.name),
					photo: sanitize(req.body.photo),
					sex: sanitize(req.body.sex),
					bio: sanitize(req.body.bio),
				}
				/* if (postId) {
					message.id = postId
					console.log("updateMessage", message)
					await db.updateMessage(message)
				}
				else */
				const newHero = await db.addHero(hero)
				res.redirect("/")
			})()
		}
	}
]

async function deleteHero(req, res, next) {
	await db.deleteHero(req.params.id)
	res.redirect("/")
}

async function deleteAll(req, res, next) {
	await db.emptyDatabase()
	res.redirect("/")
}

module.exports = {
	getView,
	getErrorView,
	getHomeView,
	getHeroView,
	getNewProfileView,
	addNewProfile,
	deleteHero,
	deleteAll,
}
