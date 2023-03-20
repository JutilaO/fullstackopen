import { useSelector } from 'react-redux'
import { notificationRemove } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  if (notification) {
    setTimeout(() => {
      dispatch(notificationRemove())
    }, 5000);

    return (
      <div style={style}>
        {notification}
      </div>
    )
  } 
}

export default Notification