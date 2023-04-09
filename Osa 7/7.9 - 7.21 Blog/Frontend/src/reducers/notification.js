import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
    name: 'notification',
    initialState : null,
    reducers: {
        notificationSet(state, action) {
            return action.payload
        },
        notificationRemove(state, action) {
            return null
        }
    }
})

  
export const { notificationSet, notificationRemove } = notificationSlice.actions

export const setNotification = (text, time, color) => {
    return async dispatch => {
        dispatch(notificationSet({text: text, color: color}))
        setTimeout(() => {
            dispatch(notificationRemove())
        }, time * 1000);
    }
  }

export default notificationSlice.reducer