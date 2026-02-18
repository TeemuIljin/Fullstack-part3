require('dotenv').config()
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI environment variable is not set')
  process.exit(1)
}
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// GET all persons (3.13)
app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => response.json(persons))
    .catch((error) => next(error))
})

// GET info page (3.18)
app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then((count) => {
      const now = new Date()
      response.send(
        `<p>Phonebook has info for ${count} ${count === 1 ? 'person' : 'people'}</p><p>${now.toString()}</p>`
      )
    })
    .catch((error) => next(error))
})

// GET single person (3.18)
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

// DELETE single person (3.15)
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error))
})

// POST new person (3.14, 3.6 validation)
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name missing' })
  }
  if (!body.number) {
    return response.status(400).json({ error: 'number missing' })
  }
  Person.findOne({ name: body.name })
    .then((existing) => {
      if (existing) {
        return response.status(400).json({ error: 'name must be unique' })
      }
      const person = new Person({
        name: body.name,
        number: body.number
      })
      return person.save().then((saved) => response.json(saved))
    })
    .catch((error) => next(error))
})

// PUT update person (3.17)
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updated) => {
      if (updated) {
        response.json(updated)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

// Serve frontend static files
app.use(express.static('dist'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Error handler middleware (3.16)
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
