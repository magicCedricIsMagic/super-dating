const { Router } = require("express")
const CustomError = require("../utils/CustomError")
const { routes } = require("./indexRouter.js")

const interestsRouter = Router()

const heroesController = require("../controllers/heroesController.js")
const interestsController = require("../controllers/interestsController.js")

interestsRouter.get("/new", (req, res, next) => {
	const route = {
		file: "interests/edit",
		title: "New interest",
	}
	interestsController.getEditInterestView(req, res, next, { routes, route: route })
})
interestsRouter.get("/edit/:id", (req, res, next) => {
	const route = {
		file: "interests/edit",
		title: "Edit interest",
	}
	interestsController.getEditInterestView(req, res, next, { routes, route })
})
interestsRouter.post("/new", interestsController.saveInterest)
interestsRouter.post("/edit/:id", interestsController.saveInterest)

interestsRouter.post("/delete/:id", interestsController.deleteInterest)

interestsRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page not found",
		"This page doesn't exist."
	)
})

interestsRouter.use((err, req, res, next) => heroesController.getErrorView(err, req, res, next, { routes }))

module.exports = interestsRouter
