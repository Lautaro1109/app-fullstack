const supertest = require('supertest')

const { app } = require('../index')
const User = require('../models/User')

const api = supertest(app)

const getUsers = async () => {
	const usersDB = await User.find({})
	return usersDB.map(user => user.toJSON())
}

module.exports = {
	api,
	getUsers
}
