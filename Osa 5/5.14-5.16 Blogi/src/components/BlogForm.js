import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    let newObject = { title: title, author: author, url: url }
    createBlog(newObject)
    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
            Title:
          <input type="text" name="Title" placeholder='blog title' onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
            Author:
          <input type="text" name="Author" placeholder='blog author' onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
            URL:
          <input type="text" name="URL" placeholder='blog url' onChange={({ target }) => setURL(target.value)}/>
        </div>
        <button type="submit">Add blog</button>
      </form>
    </div>
  )
}


export default BlogForm