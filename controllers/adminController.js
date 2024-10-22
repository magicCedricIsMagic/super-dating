const db = require("../db/queries")

async function getAdminView(req, res, next, params) {
	const types = await db.getAllTypes()
	const interests  = await db.getAllInterests()
	res.render(params.route.file, {
		title: params.route.title,
		links: params.routes,
		types,
		interests,
	})
}

module.exports = {
	getAdminView,
}
