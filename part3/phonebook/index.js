const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const persons = [
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

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('rootroot')
})

app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${persons.length} people.\n${new Date()}`)
})

app.get('/api/persons', (req, res) => {
  res.send(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  if (id <= persons.length && id > 0) {
    res.send(persons[id - 1])
  } else {
    res.status(404).send("Sorry can't find that!")
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})