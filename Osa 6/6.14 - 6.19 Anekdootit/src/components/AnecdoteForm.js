import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const getId = () => (100000 * Math.random()).toFixed(0)
        const newAnecdote = {
            content: event.target.anecdote.value,
            id: getId(),
            votes: 0
        }
        event.target.anecdote.value = ''
        dispatch(createAnecdote(newAnecdote))
        dispatch(setNotification('Added a new anecdote', 5))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm