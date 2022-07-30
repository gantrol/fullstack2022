require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const PhoneBook = require('./models/phoneBook')

const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('body', function (req, res) {
  if (Object.keys(req.body).length !== 0) {
    return JSON.stringify(req.body)
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', async (req, res) => {
  const persons = await PhoneBook.find({})
  res.send(`Phonebook has info for ${persons.length} people.\n${new Date()}`)
})

app.get('/api/persons', async (req, res) => {
  const persons = await PhoneBook.find({})
  res.send(persons)
})

app.post('/api/persons', async (req, res) => {
  // TODO：校验逻辑
  const person = req.body

  if (person.name == '' || person.number == '') {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  // TODO: name is duplicative
  // if (persons.find(p => p.name === person.name)) {
  //   return res.status(400).json({
  //     error: `${person.name} is duplicative`
  //   })
  // }
  const personObject = new PhoneBook({ ...person })
  const savedObject = await personObject.save()
  res.json(savedObject)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  if (!isNaN(id)) {
    persons = persons.filter(person => person.id !== id)
  }
  // For simplicity, 204 only, no 404 
  res.status(204).end()
})

app.get('/api/persons/:id', async (req, res) => {
  const person = await PhoneBook.findById(req.params.id)
  // TODO: check empty
  if (person) {
    res.send(person)
  } else {
    res.status(404).send("Sorry can't find that!")
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})