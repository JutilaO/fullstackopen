import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'ffff',
  url: 'sdfs',
  author: 'sdfasdf',
  likes: 0,
  user: {
    username: 'paavo',
    name: 'pekka',
    id: 1
  }
}

test('renders title', () => {

  render(<Blog blog={blog} user={blog.user}/>)

  const element = screen.getByText(`${blog.title} by ${blog.author}`)
  expect(element).toBeDefined()
})

test('renders url, likes and user', async () => {

  render(<Blog blog={blog} user={blog.user}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const title = screen.getByText(`${blog.title} by ${blog.author}`)
  const url = screen.getByText(`URL: ${blog.url}`)
  const likes = screen.getByText(`Likes: ${blog.likes}`)
  const username = screen.getByText(`Added by: ${blog.user.name}`)
  expect(title).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(username).toBeDefined()
})

test('like counter works', async () => {
  const mockLikes = jest.fn()

  render(<Blog blog={blog} user={blog.user} handleLike={mockLikes}/>)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  expect(mockLikes.mock.calls).toHaveLength(1)
  await user.click(likeButton)
  expect(mockLikes.mock.calls).toHaveLength(2)
})

test('blog form works', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog}/>)

  const titleInput = screen.getByPlaceholderText('blog title')
  const authorInput = screen.getByPlaceholderText('blog author')
  const urlInput = screen.getByPlaceholderText('blog url')

  await user.type(titleInput, 'blog1')
  await user.type(authorInput, 'author1')
  await user.type(urlInput, 'link1')

  const button = screen.getByText('Add blog')
  await user.click(button)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls[0][0].title).toBe('blog1')
  expect(createBlog.mock.calls[0][0].author).toBe('author1')
  expect(createBlog.mock.calls[0][0].url).toBe('link1')
})