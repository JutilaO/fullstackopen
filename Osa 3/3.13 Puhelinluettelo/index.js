const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require("./models/person.js")

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('build'))

let persons = 
[
    { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
    },
    { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
    },
    { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
    },
    { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
    }
]

app.use(express.json())
app.use(cors())

app.get('/info', (req, res) => {
    const time = new Date()
    Person.find({}).then(p => {
        res.send(`<p>Phonebook contains the information of ${p.length} people</p><p>${time.toString()}</p>`)
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        if(person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(person => {
        res.status(204).end()
    })
})

app.post('/api/persons', (req, res) => {
    const person = req.body
    if(!person.number || !person.name) {
        return res.status(400).json({
            error: "name or number missing"
        })
    }

    Person.find({
        name: person.name
    }, (p) => {
        if(p){
            return res.status(400).json({
                error: `${person.name} is already in the phonebook`
            })
        } else {
            const p = new Person({
                name: person.name,
                number: person.number
            })
            p.save().then(savedPerson => {
                res.json(savedPerson)
            })
        }
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})