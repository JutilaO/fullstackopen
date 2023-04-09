import {useParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { voteBlog, commentBlog, deleteBlog } from '../reducers/blog'
import {useState} from 'react'
import { setNotification } from '../reducers/notification'

const Blog = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [newComment, setComment] = useState('')
  let addDelete = false

  const blogs = useSelector(state => {
    return [...state.blogs]
  })

  const user = useSelector(state => {
    return {...state.user}
  })

  const blog = blogs.filter(blog => blog.id === id)

  if(!blog[0]) return null

  if(blog[0].user.username === user.username) addDelete = true
  
  const addComment = () => {
    dispatch(commentBlog(blog[0], newComment))
    setComment('')
    dispatch(setNotification('Added a comment', 3, 'green'))
  }

  const handleDelete = (event, blog) => {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      dispatch(deleteBlog(blog))
      dispatch(setNotification('Blog deleted', 5, 'red'))
      navigate('/blogs')
    }
  }

  return (
    <div className="container">
        <h2>{blog[0].title}</h2>
        <div>
            Author: {blog[0].author}
        </div>
        <div>
            Likes: {blog[0].likes}
            <button style={{marginLeft: '5px'}} onClick={() => dispatch(voteBlog(blog[0]))}>Like</button>
        </div>
        <div>
            Added by: {blog[0].user.username}
        </div>
        <div>
            Comments:
            <ul>{blog[0].comments.map(comment => <li key={comment}>{comment}</li>)}</ul>
            <div>
              <input
                type="text"
                id="comment"
                placeholder="comment"
                onChange={({target}) => setComment(target.value)}
              />
              <button onClick={addComment}>Send</button>
            </div>
        </div>
        <div>
          {addDelete && <button onClick={(event) => handleDelete(event, blog[0])}>Delete</button>}
        </div>
    </div>
)
}

export default Blog
