import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BORN } from '../queries'
import {useState} from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [setBornYear] = useMutation(EDIT_BORN)

  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  
  if(result.loading){
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors
  
  if (!props.show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()
    setBornYear({variables: {name: name.value, born: parseInt(born)}})
    setName('')
    setBorn('')
  }

  let options = []
  for(let i in authors){
    options.push({value: authors[i].name, label: authors[i].name})
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <div>
          name<Select defaultvalue={name} onChange={setName} options={options}/>
        </div>
        <div>
          born<input value={born} onChange={({ target }) => setBorn(target.value)}/>
        </div>
        <button type="submit">set year of birth</button>
      </form>
    </div>
  )
}

export default Authors
