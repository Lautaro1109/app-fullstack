const mongoose = require('mongoose')

require('dotenv').config()

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env
// eslint-disable-next-line no-undef
const connectionString = NODE_ENV == 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

mongoose
	.connect(connectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('Database Connected')
	})
	.catch(err => {
		console.error(err)
	})

// const note = new Note({
//     content: 'MongoDB es increible',
//     date: new Date(),
//     important: true
// })

// note.save()
//     .then(result => {
//         console.log(result)
//         mongoose.connection.close()
//     })
//     .catch(err => {
//         console.error(err)
//     })

// Note.find().then(result => {
//     console.log(result)
//     mongoose.connection.close()
// })
