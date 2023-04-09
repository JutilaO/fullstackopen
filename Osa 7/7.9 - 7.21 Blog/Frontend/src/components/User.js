import userService from '../services/users'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { Table } from 'react-bootstrap'

const User = () => {
    const id = useParams().id
    const [user, setUser] = useState({})

    useEffect(() => {
        async function get(){
            const user = await userService.getById(id)
            setUser(user)
        }
        get()
    }, [])

    const blogs = useSelector(state => {
        return [...state.blogs]
    })

    return (
        <div className="container">
            <h2>{user.name}' blogs</h2>
            <div>
                <Table striped>
                    <tbody>
                    {blogs.filter(blog => blog.user.username === user.username).map(blog => <tr key={blog.id}><td>{blog.title} by {blog.author}</td></tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default User
