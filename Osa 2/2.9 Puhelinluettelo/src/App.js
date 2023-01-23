import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newPerson, setNewPerson] = useState({name: "", number: ""})

  const [filter, setFilter] = useState("")

  const add = (event) => {
    event.preventDefault()
    if(persons.map(p => p.name).indexOf(newPerson.name) > -1) return alert(`${newPerson.name} is already added to the phonebook`)
    setPersons(persons.concat(newPerson))
  }

  const handleNameChange = (event) => {
    setNewPerson({name: event.target.value, number: newPerson.number})
  }

  const handleNumberChange = (event) => {
    setNewPerson({name: newPerson.name, number: event.target.value})
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const list = () => {
    if(filter.length > 0){
      let filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      return filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
    } else {
      return persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={add}>
        <div>filter shown with: <input onChange={handleFilterChange}/></div>
      </form>
      <h2>Add new</h2>
      <form onSubmit={add}>
        <div>name: <input onChange={handleNameChange}/></div>
        <div>number: <input onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{list()}</div>
    </div>
  )

}

export default App