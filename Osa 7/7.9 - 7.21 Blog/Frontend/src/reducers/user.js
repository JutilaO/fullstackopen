import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser(state, action) {
            return state = action.payload
        },
        removeUser(state, action) {
            return state = {}
        }
    }
})

export const {setUser, removeUser} = userSlice.actions

export const login = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({
            username,
            password,
        })
        window.localStorage.setItem('blogUser', JSON.stringify(user))
        dispatch(setUser(user))
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.removeItem('blogUser')
        dispatch(removeUser())
    }
}

export const assignUser = (user) => {
    return async dispatch => {
        dispatch(setUser(user))
    }
}

export default userSlice.reducer