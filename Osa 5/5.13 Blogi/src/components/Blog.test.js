import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'ffff',
    url: 'sdfs',
    author: 'sdfasdf',
    user: {
      username: 'paavo',
      name: 'pekka',
      id: 1
    }
  }

  render(<Blog blog={blog} user={blog.user}/>)

  const element = screen.getByText(`${blog.title} by ${blog.author}`)
  expect(element).toBeDefined()
})
