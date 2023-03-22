import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useReducer } from "react"
import NotificationContext from './notificationContext'

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'SET':
      return action.content
    case 'RESET':
      return null
    default:
      return state
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, 0)

  const result = useQuery('anecdotes', getAnecdotes)

  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({type: 'SET', content: `Voted '${anecdote.content}'`})
  }

  if(result.isLoading){
    return <div>loading data....</div>
  }
  if(result.isError){
    return <div>anecdote service is not available due to problems in the server</div>
  }
  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </NotificationContext.Provider>
  )
}

export default App
