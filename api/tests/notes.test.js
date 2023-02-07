/* eslint-disable no-undef */
const mongoose = require('mongoose')

const supertest = require('supertest')

const { app, server } = require('../index')
const Note = require('../models/Note')
const api = supertest(app)

const initialNotes = [
	{
		content: 'Contenido de una nueva nota',
		important: true
	},
	{
		content: 'Contenido de una nueva nota numero 2',
		important: true
	}
]

beforeEach(async () => {
	await Note.deleteMany()

	const note1 = new Note(initialNotes[0])
	await note1.save()

	const note2 = new Note(initialNotes[1])
	await note2.save()
})

test.skip('notes are returned as json', async () => {
	await api
		.get('/api/notes')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test.skip('there are two notes', async () => {
	const response = await api.get('/api/notes')
	expect(response.body).toHaveLenght(initialNotes.length)
})

afterAll(() => {
	server.close()
	mongoose.connection.close()
})
