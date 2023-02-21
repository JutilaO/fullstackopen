import {useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setURL] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        let newObject = {title: title, author: author, url: url}
        blogService.create(newObject)
        setTitle('')
        setAuthor('')
        setURL('')
        props.notifications(`Added ${title}`, {color: "green"})
        props.setBlogFormVisible(false)
    }

    return (
    <div>
    <form onSubmit={addBlog}>
        <div>
            Title:
            <input type="text" name="Title" onChange={({target}) => setTitle(target.value)}/>
        </div>
        <div>
            Author:
            <input type="text" name="Author" onChange={({target}) => setAuthor(target.value)}/>
        </div>
        <div>
            URL:
            <input type="text" name="URL" onChange={({target}) => setURL(target.value)}/>
        </div>
      <button type="submit">Add blog</button>
    </form>
    </div>
    )
}


export default BlogForm