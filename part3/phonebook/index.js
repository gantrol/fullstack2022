const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { response } = require('express')


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

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${persons.length} people.\n${new Date()}`)
})

app.get('/api/persons', (req, res) => {
  res.send(persons)
})

app.post('/api/persons', (req, res) => {
  // TODO：校验逻辑
  const id = Math.ceil(Math.random() * 9999999);
  const person = req.body

  if (person.name == '' || person.number == '') {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  // name is duplicative
  if (persons.find(p => p.name === person.name)) {
    return res.status(400).json({
      error: `${person.name} is duplicative`
    })
  }
  const personObject = { ...person, id }
  persons.push(personObject)
  res.json(personObject)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  if (!isNaN(id)) {
    persons = persons.filter(person => person.id !== id)
  }
  // For simplicity, 204 only, no 404 
  res.status(204).end()
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const index = persons.findIndex(p => p.id === id)
  if (index > -1) {
    res.send(persons[index])
  } else {
    res.status(404).send("Sorry can't find that!")
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})