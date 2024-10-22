const { body, validationResult } = require("express-validator")
const { sanitize } = require("../utils/texts")
const CustomError = require("../utils/CustomError")
const db = require("../db/queries")

async function getEditTypeView(req, res, next, params) {
	const type = await db.getType(req.params.id)
	if (req.params.id && !type) {
		next()
	}
	else {
		res.render(params.route.file, {
			title: params.route.title,
			links: params.routes,
			type: type,
		})
	}
}

const validateType = [
	body("name")
		.isLength({ min: 1, max: 100 })
		.withMessage(`Type must be between 1 and 100 caracters`),
]
const saveType = [
	validateType,
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
				const type = {
					name: sanitize(req.body.name),
				}
				if (req.params.id) {
					type.id = parseInt(req.params.id)
					await db.updateType(type)
				}
				else {
					await db.addType(type)
				}
				res.redirect(`/admin`)
			})()
		}
	}
]

async function deleteType(req, res, next) {
	await db.deleteType(req.params.id)
	res.redirect("/admin")
}

module.exports = {
	getEditTypeView,
	saveType,
	deleteType
}
