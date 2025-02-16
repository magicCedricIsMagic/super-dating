const sanitize = (string) => string.replace(/(<([^>]+)>)/gi, "")

function getPlural(word) {
	let plural = word.toLowerCase().slice(-2) === "ss" ? "es" : "s"
	return plural
}

module.exports = { sanitize, getPlural }
