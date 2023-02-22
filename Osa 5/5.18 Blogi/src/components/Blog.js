import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs, user, notifications, handleLike }) => {
  const [show, setShow] = useState([])
  let owner = false
  if(blog.user.username === user.username) owner = true

  Blog.propTypes = {
    blog: PropTypes.func.isRequired,
    blogs: PropTypes.func.isRequired,
    setBlogs: PropTypes.func.isRequired,
    user: PropTypes.func.isRequired,
    notifications: PropTypes.func.isRequired
  }

  const handleClick = (event, blog) => {
    event.preventDefault()
    if(!show.includes(blog.id)) {
      setShow(show.concat(blog.id))
    } else {
      setShow(show.filter(b => b !== blog.id))
    }
  }

  const handleDelete = (event, blog) => {
    event.preventDefault()
    if(window.confirm(`Are you sure you want to delete ${blog.title}?`)){
      blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      notifications('Blog deleted', { color: 'green' })
    }
  }

  const Result = ({ blog }) => {
    let result
    if(show.includes(blog.id)){
      result = (
        <div>
          <div>{blog.title} by {blog.author}</div>
          <div>URL: {blog.url}</div>
          <div>Likes: {blog.likes} <button onClick={(event) => handleLike(event, blog)}>like</button></div>
          <div>Added by: {blog.user.name} {owner && <button onClick={(event) => handleDelete(event, blog)}>delete</button>}</div>
          <button onClick={(event) => handleClick(event, blog)}>hide</button>
        </div>
      )
    } else {
      result = (
        <div>
          {blog.title} by {blog.author}
          <button onClick={(event) => handleClick(event, blog)}>view</button>
        </div>
      )
    }
    return result
  }


  return (
    <div>
      <Result blog={blog}/>
    </div>
  )

}

export default Blog