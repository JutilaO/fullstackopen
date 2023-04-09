import userService from '../services/users'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getAll(){
            const users = await userService.get()
            setUsers(users)
        }
        getAll()
    }, [])

    return (
        <div className="container">
            <h2>Users</h2>
            <Table striped>
                <tbody>
                    <tr>
                        <td>name</td>
                        <td>blogs</td>
                    </tr>
                    {users.map(user => 
                        <tr key={user.name}>
                            <td> <Link to={`/users/${user.id}`}>{user.name}</Link> </td>
                            <td>{user.blogs.length}</td>   
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default UserList
