const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person.js')

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if(error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.get('/info', (req, res, next) => {
  const time = new Date()
  Person.find({}).then(p => {
    res.send(`<p>Phonebook contains the information of ${p.length} people</p><p>${time.toString()}</p>`)
  })
    .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if(person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id).then(() => {
    res.status(204).end()
  })
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const person = req.body
  if(!person.number || !person.name) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  const p = new Person({
    name: person.name,
    number: person.number
  })
  p.save().then(savedPerson => {
    res.json(savedPerson)
  })
    .catch(err => next(err))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { number: body.number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})