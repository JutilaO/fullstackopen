import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationSet } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (!state.filter) return [...state.anecdotes]
        return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
        
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
        dispatch(notificationSet('Voted anecdote'))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList