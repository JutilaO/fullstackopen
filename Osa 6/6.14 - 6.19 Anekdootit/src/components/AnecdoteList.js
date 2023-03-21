import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (!state.filter) return [...state.anecdotes]
        return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
        
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification('Voted anecdote', 53))
    }

    return (
        <div>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList