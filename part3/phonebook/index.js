require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const process = require('process')
const PhoneBook = require('./models/phoneBook')

const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('body', (req) => {
  if (Object.keys(req.body).length !== 0) {
    return JSON.stringify(req.body)
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', async (_req, res) => {
  const persons = await PhoneBook.find({})
  res.send(`Phonebook has info for ${persons.length} people.\n${new Date()}`)
})

app.get('/api/persons', async (_req, res) => {
  const persons = await PhoneBook.find({})
  res.send(persons)
})

app.post('/api/persons', async (req, res, next) => {
  const person = req.body
  // TODO: if duplicative, reject
  try {
    const dbPersonWithSameName = await PhoneBook.findOne({ name: person.name })
    if (!dbPersonWithSameName) {
      const personObject = new PhoneBook({ ...person })
      const savedObject = await personObject.save()
      res.json(savedObject)
    } else {
      const personObject = {
        ...person,
        id: dbPersonWithSameName.id,
      }
      await PhoneBook.updateOne({ id: personObject.id }, personObject,
        { runValidators: true, context: 'query' })
      res.json(personObject)
    }
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    await PhoneBook.findByIdAndRemove(id,
      { runValidators: true, context: 'query' })
    res.status(204).end()
  }
  catch (error) { next(error) }
})

app.put('/api/persons/:id', async (req, res, next) => {
  const id = req.params.id
  const body = req.body
  try {
    // https://github.com/mongoose-unique-validator/mongoose-unique-validator#find--updates
    // When using findOneAndUpdate and related methods, mongoose doesn't automatically run validation.
    const updatedOne = await PhoneBook.findByIdAndUpdate(id, body,
      { runValidators: true, context: 'query' })
    res.json(updatedOne)
  }
  catch (error) { next(error) }
})

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await PhoneBook.findById(req.params.id)
    if (person) {
      res.send(person)
    } else {
      res.status(404).send('Sorry can\'t find that!')
    }
  } catch (error) {
    next(error)
  }
})

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = (error, _request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})