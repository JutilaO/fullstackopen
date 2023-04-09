import {useState} from 'react'
import { setNotification } from '../reducers/notification'
import { createBlog } from '../reducers/blog'
import { useDispatch } from 'react-redux'

const BlogForm = ({user, setBlogFormVisible}) => {
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [url, setURL] = useState(null)
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    let newObject = {title: title, author: author, url: url, user: user}
    setTitle(null)
    setAuthor(null)
    setURL(null)
    setBlogFormVisible(false)
    dispatch(createBlog(newObject))
    dispatch(setNotification(`Added ${newObject.title}`, 5, 'green'))
  }

  return (
    <div className="container">
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type="text"
            id="Title"
            placeholder="blog title"
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            id="Author"
            placeholder="blog author"
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            id="URL"
            placeholder="blog url"
            onChange={({target}) => setURL(target.value)}
          />
        </div>
        <button id="add-blog-button" type="submit">
          Add blog
        </button>
      </form>
    </div>
  )
}

export default BlogForm
