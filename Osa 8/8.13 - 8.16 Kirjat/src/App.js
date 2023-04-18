import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'

const App = () => {
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState(null)



  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Notification notification={notification} setNotification={setNotification} />

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'}/>

      <NewBook show={page === 'add'} setNotification={setNotification}/>
    </div>
  )
}

export default App
