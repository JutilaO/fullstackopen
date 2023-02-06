const express = require('express')
const app = express()

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

app.get('/info', (req, res) => {
    const time = new Date()
    res.send(`<p>Phonebook contains the information of ${persons.length} people</p><p>${time.toString()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const person = req.body
    person.id = Math.floor(Math.random() * 9999)
    if(!person.number || !person.name) {
        return res.status(400).json({
            error: "name or number missing"
        })
    }
    if(persons.find(p => p.name === person.name)){
        return res.status(400).json({
            error: `${person.name} is already in the phonebook`
        })
    }
    persons = persons.concat(person)
    res.json(person)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})