const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')
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
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: 1991,
        msg: 'year must be 1991 or later'
      },
      max: {
        args: new Date().getFullYear(),
        msg: 'year must be between 1991 and current year'
      }
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

module.exports = Blog