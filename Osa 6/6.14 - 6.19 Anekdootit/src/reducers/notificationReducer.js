import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationSet(state, action) {
            console.log(state)
            return action.payload
        },
        notificationRemove(state, action) {
            return ''
        }
    }
})

  
export const { notificationSet, notificationRemove } = notificationSlice.actions

export const setNotification = (text, time) => {
    return async dispatch => {
        dispatch(notificationSet(text))
        setTimeout(() => {
            dispatch(notificationRemove())
        }, time * 1000);
    }
  }

export default notificationSlice.reducer