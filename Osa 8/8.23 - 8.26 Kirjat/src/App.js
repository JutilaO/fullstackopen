import { useState} from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/Login.js'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommendations from './components/Recommendations'
import {BOOK_ADDED, ALL_BOOKS} from './queries.js'

export const updateCache = (cache, query, addedBook) => {
  cache.updateQuery(query, ({allBooks}) => {
      return { allBooks: allBooks.concat(addedBook) }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()


  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      setNotification(`New book added: ${data.data.bookAdded.title}`)
      const addedBook = data.data.bookAdded
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if(!token && true === false){
    return(
      <div>
        <Notification notification={notification} setNotification={setNotification} />
        <LoginForm setToken={setToken} setNotification={setNotification} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {token && <button onClick={() => logout()}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Notification notification={notification} setNotification={setNotification} />

      <LoginForm show={page === 'login'} setToken={setToken} setNotification={setNotification} />

      <Authors show={page === 'authors'} token={token}/>

      <Books show={page === 'books'}/>

      <NewBook show={page === 'add'} setNotification={setNotification}/>

      <Recommendations show={page === 'recommendations'} />
    </div>
  )
}

export default App
