const userExtractor = require('../midddlewares/userExtractor')

const User = require('../models/User')
const Note = require('../models/Note')

const notesRouter = require('express').Router()

notesRouter.get('/', async (req, res) => {
	const notes = await Note.find({}).populate('user', {
		username: 1,
		name: 1
	})
	res.json(notes)
})

notesRouter.get('/:id', (req, res, next) => {
	const { id } = req.params

	Note.findById(id)
		.then(note => {
			if (note) {
				return res.json(note)
			} else {
				res.status(404).end()
			}
		})
		.catch(err => {
			res.status(500).end()
			next(err)
		})
})

notesRouter.delete('/:id', (req, res, next) => {
	const { id } = req.params

	Note.FindByIdAndRemove(id).catch(error => {
		res.status(204).end()
		next(error)
	})

	res.status(204).end()
})

notesRouter.put('/:id', (req, res) => {
	const { id } = req.params
	const { content, important } = req.body

	const newNoteInfo = {
		content,
		important
	}

	Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then(result => {
		res.json(result)
	})
})

notesRouter.post('/', userExtractor, async (req, res, next) => {
	const { content, important = false } = req.body

	const { userId } = req

	const user = await User.findById(userId)

	if (!content) {
		return res.status(400).json({
			error: 'required "content" is missing'
		})
	}

	const newNote = new Note({
		content,
		date: new Date(),
		important,
		user: user._id
	})

	try {
		const savedNote = await newNote.save()

		user.notes = user.notes.concat(savedNote._id)
		await user.save()

		res.json(savedNote)
	} catch (error) {
		next(error)
	}
})

module.exports = notesRouter
