const Blog = require('./blog')
const User = require('./user')
const List = require('./list')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: List, as: 'readlist' })
Blog.belongsToMany(User, { through: List, as: 'usersReadlist' })

module.exports = {
  Blog, User
}