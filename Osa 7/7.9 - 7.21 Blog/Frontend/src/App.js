import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import BlogList from './components/BlogList'
import { setNotification } from './reducers/notification'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs, initializeBlog, voteBlog } from './reducers/blog'
import {login, logout, assignUser} from './reducers/user'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams
} from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const hideWhenVisible = {display: blogFormVisible ? 'none' : ''}
  const showWhenVisible = {display: blogFormVisible ? '' : 'none'}

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login(username, password))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 5, 'red'))
    }
  }

  useEffect(() => {
    dispatch(initializeBlog())
  }, [dispatch])

  const user = useSelector(state => {
    return {...state.user}
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(assignUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  if (!user.name) {
    return (
      <div className="container">
        <h2>Log in</h2>
        <Notification />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }
  
  const Menu = () => {
    const padding = {
      paddingRight: 5
    }

    return (
      <div className="container">
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to='/blogs'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
      </div>
    )
  }

  return (
    <Router>
    <Menu />
    <Notification />
    <Routes>
      <Route path='/' element={
    <div className="container">
      <h2>blogs</h2>
      {user && (
        <div>
          <p>{user.name} logged in</p>
        </div>
      )}
      <button type="button" onClick={() => dispatch(logout())}>
        log out
      </button>
      <div style={hideWhenVisible}>
        <button
          id="create-blog-button"
          onClick={() => setBlogFormVisible(true)}
        >
          create blog
        </button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm
          setBlogFormVisible={setBlogFormVisible}
          user={user}
        />
        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
    </div>
      }/>
    <Route path='/blogs' element={<BlogList />}/>
    <Route path='/blogs/:id' element={<Blog />}/>
    <Route path='/users' element={<UserList />}/>
    <Route path='/users/:id' element={<User />}/>
    </Routes>
      
    </Router>
  )
}

export default App
