// routes/indexRouter.js
const { Router } = require("express")
const CustomError = require("../utils/CustomError")

const indexRouter = Router()

const indexController = require("../controllers/indexController.js")

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
		indexController.getView(req, res, next, { routes, route })
	})
} */

indexRouter.get("/", (req, res, next) => {
	indexController.getHomeView(req, res, next, { routes, route: routes[0] })
})

indexRouter.get("/heroes-by-type/:id", (req, res, next) => {
	indexController.getHeroesByTypeView(req, res, next, { routes })
})
indexRouter.get("/heroes-by-interest/:id", (req, res, next) => {
	indexController.getHeroesByInterestView(req, res, next, { routes })
})

indexRouter.get("/new-hero", (req, res, next) => {
	indexController.getEditHeroView(req, res, next, { routes, route: routes[1] })
})
indexRouter.get("/edit-hero/:id", (req, res, next) => {
	let route = {...routes[1]}
	route.title = "Edit my profile"
	indexController.getEditHeroView(req, res, next, { routes, route })
})
indexRouter.post("/new-hero", indexController.saveHero)
indexRouter.post("/edit-hero/:id", indexController.saveHero)

indexRouter.get("/admin", (req, res, next) => {
	indexController.getView(req, res, next, { routes, route: routes[2] })
})

indexRouter.get("/hero/:id", (req, res, next) => {
	indexController.getHeroView(req, res, next, { routes })
})

indexRouter.post("/delete-hero/:id", indexController.deleteHero)

// indexRouter.get("/delete-all", indexController.deleteAll)


indexRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page not found",
		"This page doesn't exist."
	)
})

indexRouter.use((err, req, res, next) => indexController.getErrorView(err, req, res, next, { routes }))

module.exports = indexRouter
