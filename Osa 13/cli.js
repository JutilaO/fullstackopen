require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(process.env.DB_URL)

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

const printBlogs = async () => {
  const data = await Blog.findAll()
  const blogs = data.map(blog => blog.dataValues)

  for(let i = 0; i < blogs.length; i++){
    console.log(`${blogs[i].author} - ${blogs[i].title} - ${blogs[i].likes} likes`)
  }
}

printBlogs()