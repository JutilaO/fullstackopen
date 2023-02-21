import { useState } from 'react'

const Blog = ({blog}) => {
  const [show, setShow] = useState([])

  const handleClick = (event, blog) => {
    event.preventDefault()
    if(!show.includes(blog.id)) {
      setShow(show.concat(blog.id))
    } else {
      setShow(show.filter(b => b !== blog.id))
    }
  }

  const Result = ({blog}) => {
    let result
    if(show.includes(blog.id)){
      result = (
        <div>
          <div>{blog.title} {blog.author}</div>
          <div>URL: {blog.url}</div>
          <div>Likes: {blog.likes}</div>
          <div>Added by: {blog.user.name}</div>
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