const Notification = ({notification, setNotification}) => {

    setTimeout(() => {
        setNotification(null)
    }, 5000);

    if(notification){
        return (
            <div style={{color: 'red'}}>
                {notification}
            </div>
        )
    }
}

export default Notification