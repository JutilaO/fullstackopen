import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorStyle, setErrorStyle] = useState({color: "red"})

  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const hideWhenVisible = { display: blogFormVisible ? 'none' : ''}
  const showWhenVisible = { display: blogFormVisible ? '' : 'none'}

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
      <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>create blog</button>
      </div>
      <div style={showWhenVisible}>
          <BlogForm notifications={notifications} setBlogFormVisible={setBlogFormVisible}/>
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default App