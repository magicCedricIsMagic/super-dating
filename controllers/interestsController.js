const { body, validationResult } = require("express-validator")
const { sanitize } = require("../utils/texts")
const CustomError = require("../utils/CustomError")
const db = require("../db/queries")

async function getEditInterestView(req, res, next, params) {
	const interest = await db.getInterest(req.params.id)
	if (req.params.id && !interest) {
		next()
	}
	else {
		res.render(params.route.file, {
			title: params.route.title,
			links: params.routes,
			interest: interest,
		})
	}
}

const validateInterest = [
	body("name")
		.isLength({ min: 1, max: 100 })
		.withMessage(`Interest must be between 1 and 100 caracters`),
]
const saveInterest = [
	validateInterest,
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
				const interest = {
					name: sanitize(req.body.name),
				}
				if (req.params.id) {
					interest.id = parseInt(req.params.id)
					await db.updateInterest(interest)
				}
				else {
					await db.addInterest(interest)
				}
				res.redirect(`/admin`)
			})()
		}
	}
]

async function deleteInterest(req, res, next) {
	await db.deleteInterest(req.params.id)
	res.redirect("/admin")
}

module.exports = {
	getEditInterestView,
	saveInterest,
	deleteInterest
}
