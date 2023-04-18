import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import { useEffect, useState } from 'react'

const Recommendations = (props) => {
  const [category, setCategory] = useState(null)

  const user = useQuery(ME)

  const result = useQuery(ALL_BOOKS, {
    refetchQueries: [{query: ALL_BOOKS}],
    variables: {genre: category}
  })
  
  useEffect(() => {
    if(user.data && user.data.me) setCategory(user.data.me.favoriteGenre)
  }, [user.data])
  
  if(result.loading){
    return <div>loading...</div>
  }

  const books = result.data.allBooks

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
    </div>
  )
}

export default Recommendations
