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
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}