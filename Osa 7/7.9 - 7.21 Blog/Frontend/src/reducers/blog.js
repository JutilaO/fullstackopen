import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const newBlog = action.payload
      return state.map(blog => blog.id !== newBlog.id ? blog : newBlog)
    },
    removeBlog(state, action) {
        return state.filter(blogs => blogs.id !== action.payload.id)
    }
  }
})

export const { appendBlog, setBlogs, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const voteBlog = blog => {
  return async dispatch => {
    const newBlog = {...blog}
    newBlog.likes += 1
    const votedBlog = await blogService.update(newBlog.id, newBlog)
    dispatch(updateBlog(newBlog))
  }
}

export const deleteBlog = blog => {
    return async dispatch => {
        await blogService.remove(blog.id)
        dispatch(removeBlog(blog))
    }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const newBlog = {...blog}
    if(!newBlog.comments) newBlog.comments = []
    newBlog.comments = [...newBlog.comments, comment]
    await blogService.update(newBlog.id, newBlog)
    dispatch(updateBlog(newBlog))
  }
}

export default blogSlice.reducer