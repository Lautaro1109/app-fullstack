const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
	const authorization = req.get('authorization') // Bearer blablabla
	let token = null

	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		token = authorization.substring(7)
	}

	let decodeToken = {}
	try {
		decodeToken = jwt.verify(token, process.env.SECRET, {
			expiresIn: 60 * 60 * 24 * 7
		})
	} catch (e) {}

	if (!token || !decodeToken.id) {
		return res.status(401).json({
			error: 'token is missing or invalid'
		})
	}

	const { id: userId } = decodeToken
	req.userId = userId

	next()
}
