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
		url: "/create-profile",
		file: "create-profile",
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

indexRouter.get("/create-profile", (req, res, next) => {
	indexController.getNewProfileView(req, res, next, { routes, route: routes[1] })
})
indexRouter.post("/create-profile", indexController.addNewProfile)

indexRouter.get("/admin", (req, res, next) => {
	indexController.getView(req, res, next, { routes, route: routes[2] })
})

indexRouter.get("/delete-hero/:id", indexController.deleteHero)

// indexRouter.get("/delete-all", indexController.deleteAll)


indexRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page not found",
		"This page doesn't exist."
	)
})

indexRouter.use((err, req, res, next) => indexController.getErrorView(err, req, res, next, { routes }))

module.exports = indexRouter
