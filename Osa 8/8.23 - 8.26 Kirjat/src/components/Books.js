import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [category, setCategory] = useState(null)

  const result = useQuery(ALL_BOOKS, {
    variables: {genre: category},
    pollInterval: 2000
  })
  
  
  if(result.loading){
    return <div>loading...</div>
  }
  const books = result.data.allBooks
  const buttons = []

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.authorName}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
        <div id="categoryButtons">
            {!category && books.map((a) => 
              a.genres.map((g) => {
                if(!buttons.includes(g)){
                  buttons.push(g)
                  return (<button key={g} onClick={() => setCategory(g)}>{g}</button>)
                }
              })
            )}
            {category && <button onClick={() => setCategory(null)}>reset filter</button>}
        </div>
    </div>
  )
}

export default Books
