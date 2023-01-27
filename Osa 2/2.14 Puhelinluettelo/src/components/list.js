import personService from "../services/persons.js"

const DeletePerson = (person, event) => {
    event.preventDefault()
    if(window.confirm(`Are you sure you want to delete ${person.name}`)){
        personService
        .deleteById(person)
    }
}

const List = (props) => {
    if(props.filter.length > 0){
      let filteredPersons = props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
      return filteredPersons.map(person => <p key={person.name}>{person.name} {person.number} <Button handleClick={(event) => DeletePerson(person, event)} text="delete"/></p>)
    } else {
      return (props.persons.map(person => <p key={person.name}>{person.name} {person.number} <Button handleClick={(event) => DeletePerson(person, event)} text="delete"/></p>))
    }
}

const Button = (props) => {
    return (
      <button onClick={props.handleClick}>
        {props.text}
      </button>
    )
}

export default List