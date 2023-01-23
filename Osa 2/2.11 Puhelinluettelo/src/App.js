import { useState, useEffect } from 'react'
import Filter from "./components/filter.js"
import Form from "./components/form.js"
import List from "./components/list.js"
import axios from "axios"

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>Add new</h2>
      <Form add={add} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <List persons={persons} filter={filter} setFilter={setFilter}/>
    </div>
  )

}

export default App