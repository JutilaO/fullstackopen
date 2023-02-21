import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorStyle, setErrorStyle] = useState({color: "red"})

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'blogUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifications('wrong credentials', {color: "red"})
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )


  const logout = () => {
    window.localStorage.removeItem('blogUser')
    setUser(null)
  }

  const notifications = (text, style) => {
    setErrorMessage(text)
    setErrorStyle(style)
    setTimeout(() => {
      setErrorMessage(null)
      setErrorStyle({color: "red"})
    }, 5000);
  }


  if(!user) {
    return (
      <div>
        <h2>Log in</h2>
        <Notification message={errorMessage} style={errorStyle} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} style={errorStyle} />
       {user && <div>
        <p>{user.name} logged in</p>
        </div>}
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <button type="button" onClick={logout}>log out</button>
      <BlogForm notifications={notifications}/>
    </div>
  )
}

export default App