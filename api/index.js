require('./mongo')
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const handleErrors = require('./midddlewares/handleErrors')
const notFound = require('./midddlewares/notFound')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const loginRouter = require('./controllers/login')

app.use(express.json())
app.use(cors())

app.use('/api/users', usersRouter)
app.use('/api/notes', notesRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'development') {
	const testingRouter = require('./controllers/testing')

	app.use('/api/testing', testingRouter)
}

app.use(notFound)
app.use(handleErrors)

const PORT = 3001
const server = app.listen(PORT, () => {
	console.log('Server Running on' + ' ' + PORT)
})

module.exports = { app, server }
