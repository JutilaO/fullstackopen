import { useContext } from 'react'
import NotificationContext from '../notificationContext'

const Notification = () => {

  // eslint-disable-next-line no-unused-vars
  const [notification, notificationDispatch] = useContext(NotificationContext)
 
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notification) {
    setTimeout(() => {
      notificationDispatch({type: 'RESET'})
    }, 5000);
  
    return (
      <div style={style}>
          {notification}
      </div>
    )
  }
}

export default Notification
