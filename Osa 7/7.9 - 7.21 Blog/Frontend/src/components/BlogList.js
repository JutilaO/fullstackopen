import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(state => {
    return [...state.blogs]
  })

  return (
    <div className="container">
        <h2>Blogs</h2>
        <Table striped>
            <tbody>
                {blogs.map(blog => 
                    <tr key={blog.id}>
                        <td>
                            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </td>
                    </tr>
                    )}
            </tbody>
        </Table>
    </div>
  )

}

export default BlogList
