// routes/indexRouter.js
const { Router } = require("express")
const CustomError = require("../utils/CustomError")

const indexRouter = Router()

const heroesController = require("../controllers/heroesController.js")
const adminController = require("../controllers/adminController.js")

const routes = [
	{
		url: "/",
		file: "index",
		title: "Super Dating",
		linkTitle: "Home",
	},
	{
		url: "/new-hero",
		file: "edit-hero",
		title: "Create my profile",
	},
	{
		url: "/admin",
		file: "admin",
		title: "Admin",
	},
]

/* for (const route of routes) {
	indexRouter.get(route.url, (req, res, next) => {
		heroesController.getView(req, res, next, { routes, route })
	})
} */

indexRouter.get("/", (req, res, next) => {
	heroesController.getHomeView(req, res, next, { routes, route: routes[0] })
})

indexRouter.get("/heroes-by-type/:id", (req, res, next) => {
	heroesController.getHeroesByTypeView(req, res, next, { routes })
})
indexRouter.get("/heroes-by-interest/:id", (req, res, next) => {
	heroesController.getHeroesByInterestView(req, res, next, { routes })
})

indexRouter.get("/new-hero", (req, res, next) => {
	heroesController.getEditHeroView(req, res, next, { routes, route: routes[1] })
})
indexRouter.get("/edit-hero/:id", (req, res, next) => {
	let route = {...routes[1]}
	route.title = "Edit my profile"
	heroesController.getEditHeroView(req, res, next, { routes, route })
})
indexRouter.post("/new-hero", heroesController.saveHero)
indexRouter.post("/edit-hero/:id", heroesController.saveHero)

indexRouter.get("/admin", (req, res, next) => {
	adminController.getAdminView(req, res, next, { routes, route: routes[2] })
})

indexRouter.get("/hero/:id", (req, res, next) => {
	heroesController.getHeroView(req, res, next, { routes })
})

indexRouter.post("/delete-hero/:id", heroesController.deleteHero)

// indexRouter.get("/delete-all", heroesController.deleteAll)


indexRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page not found",
		"This page doesn't exist."
	)
})

indexRouter.use((err, req, res, next) => heroesController.getErrorView(err, req, res, next, { routes }))

module.exports = { indexRouter, routes }
