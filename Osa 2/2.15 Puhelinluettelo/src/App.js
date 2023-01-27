import { useState, useEffect } from 'react'
import Filter from "./components/filter.js"
import Form from "./components/form.js"
import Person from "./components/person.js"
import personService from "./services/persons.js"

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const [newPerson, setNewPerson] = useState({name: "", number: ""})

  const [filter, setFilter] = useState("")

  const add = (event) => {
    event.preventDefault()
    if(persons.map(p => p.name).indexOf(newPerson.name) > -1){
      if(window.confirm(`${newPerson.name} is already added to the phonebook, do you want to replace?`)){
        let id = persons[persons.map(p => p.name).indexOf(newPerson.name)].id
        personService.update(id, newPerson)
          .then(response => {
            setPersons(persons.map(p => p.id !== id ? p : response.data))
          })
      } 
    } else {
      setPersons(persons.concat(newPerson))
      personService
        .createNew(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    }
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
  
  const Button = (props) => {
    return (
      <button onClick={props.handleClick}>
        {props.text}
      </button>
    )
}


const DeletePerson = (person, event) => {
  event.preventDefault()
  if(window.confirm(`Are you sure you want to delete ${person.name}`)){
      personService.deleteById(person)
      let arr = persons.filter(p => p.id !== person.id)
      setPersons(arr)
  }
}

var personsToShow = persons

if(filter.length > 0){
  let filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  personsToShow = filteredPersons
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>Add new</h2>
      <Form add={add} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
        <li id={person.id}>
          <Person key={person.id} person={person}/>
          <Button key={person.name} handleClick={(event) => DeletePerson(person, event)} text="delete"/>
        </li>
        )}
      </ul>
    </div>
  )

}

export default App