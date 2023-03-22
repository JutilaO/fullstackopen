import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useContext } from 'react'
import NotificationContext from '../notificationContext'

const AnecdoteForm = () => {

  // eslint-disable-next-line no-unused-vars
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      notificationDispatch({type: 'SET', content: 'Anecdote too short, it must be longer than 5 characters'})
    }
  })
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content})
    notificationDispatch({type: 'SET', content: `Created ${content}`})
  }
  

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
