/* eslint-disable no-undef */
const bcrypt = require('bcrypt')
const { mongoose } = require('mongoose')
const { server } = require('../index')
const User = require('../models/user')
const { api, getUsers } = require('./helpers')

describe.skip('creating a new user', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('pasword', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('works as expected creating a fresh username,', async () => {
		const userAtStart = await getUsers()

		const newUser = {
			username: 'lautyriveros',
			name: 'Lautaro',
			password: 'tw1tch'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await getUsers()

		expect(usersAtEnd).toHaveLength(userAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)

		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username is already taken', async () => {
		const userAtStart = await getUsers()

		const newUser = {
			username: 'lautyriveros',
			name: 'Lautaro',
			password: 'tw1tch'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.errors.username.message).toContain(
			'`username` to be unique'
		)

		const usersAtEnd = getUsers()

		expect(usersAtEnd).toHaveLength(userAtStart.length)
	})

	afterAll(() => {
		mongoose.connection.close()
		server.close()
	})
})
