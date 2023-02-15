const dummy = (blogs) => {
  if(blogs) return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach(blog => {
    likes += blog.likes
  })
  return likes
}

const favoriteBlog = (blogs) => {
  let favorite = blogs[0]
  blogs.forEach(blog => {
    if(blog.likes > favorite.likes) favorite = blog
  })

  return {
    'title': favorite.title,
    'author': favorite.author,
    'likes': favorite.likes
  }
}

const mostBlogs = (blogs) => {
  let counter = {}
  let mostBlogs = 0
  let author = ''

  blogs.forEach(blog => {
    if(blog.author in counter){
      counter[blog.author].blogs += 1
    } else {
      counter[blog.author] = {name: blog.author, blogs: 1}
    }
    if(counter[blog.author].blogs > mostBlogs){
      mostBlogs = counter[blog.author].blogs
      author = blog.author
    }
  })
  
  return {
    'author': author,
    'blogs': mostBlogs
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}