import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, blogs, setBlogs}) => {
  const [show, setShow] = useState([])

  const handleClick = (event, blog) => {
    event.preventDefault()
    if(!show.includes(blog.id)) {
      setShow(show.concat(blog.id))
    } else {
      setShow(show.filter(b => b !== blog.id))
    }
  }

  const handleLike = (event, blog) => {
    event.preventDefault()
    blog.likes += 1
    blogService.update(blog.id, blog)
    setBlogs(blogs.concat())
  }

  const handleDelete = (event, blog) => {
    event.preventDefault()
    
  }

  const Result = ({blog}) => {
    let result
    if(show.includes(blog.id)){
      result = (
        <div>
          <div>{blog.title} {blog.author}</div>
          <div>URL: {blog.url}</div>
          <div>Likes: {blog.likes} <button onClick={(event) => handleLike(event, blog)}>like</button></div>
          <div>Added by: {blog.user.name} <button onClick={(event) => handleDelete(event, blog)}>delete</button></div>
          <button onClick={(event) => handleClick(event, blog)}>hide</button>
        </div>
      )
    } else {
      result = ( 
      <div>
        {blog.title} {blog.author}
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