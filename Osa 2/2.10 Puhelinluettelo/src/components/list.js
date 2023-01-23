const List = (props) => {
    if(props.filter.length > 0){
      let filteredPersons = props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
      return filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
    } else {
      return props.persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
    }
}

export default List