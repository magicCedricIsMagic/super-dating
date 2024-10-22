const { Router } = require("express")
const CustomError = require("../utils/CustomError")
const { routes } = require("./indexRouter.js")

const typesRouter = Router()

const heroesController = require("../controllers/heroesController.js")
const typesController = require("../controllers/typesController.js")

typesRouter.get("/new", (req, res, next) => {
	const route = {
		file: "types/edit",
		title: "New type",
	}
	typesController.getEditTypeView(req, res, next, { routes, route: route })
})
typesRouter.get("/edit/:id", (req, res, next) => {
	const route = {
		file: "types/edit",
		title: "Edit type",
	}
	typesController.getEditTypeView(req, res, next, { routes, route })
})
typesRouter.post("/new", typesController.saveType)
typesRouter.post("/edit/:id", typesController.saveType)

typesRouter.post("/delete/:id", typesController.deleteType)

typesRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page not found",
		"This page doesn't exist."
	)
})

typesRouter.use((err, req, res, next) => heroesController.getErrorView(err, req, res, next, { routes }))

module.exports = typesRouter
