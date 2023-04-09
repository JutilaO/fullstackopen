import '../index.css'
import {useSelector} from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  
  if(notification) return (
    <div className="container" id="error" style={{color: notification.color}}>
      {notification.text}
    </div>
  )
}

export default Notification
