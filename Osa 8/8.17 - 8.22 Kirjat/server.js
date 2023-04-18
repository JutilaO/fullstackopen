const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const Author = require('./src/models/author.js')
const Book = require('./src/models/book.js')
const User = require('./src/models/user.js')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
})


const typeDefs = `
  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String]!
    id: ID!
    authorName: String
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(name: String, genre: String): [Book]!
    allAuthors: [Author]!
    me: User
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String]
    ): Book
    editAuthor(
        name: String!
        born: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
        let list = await Book.find({})
        if(args.genre) list = list.filter(book => book.genres.includes(args.genre))
        for(let i in list){
          const author = await Author.findById(list[i].author.toString())
          list[i].authorName = author.name
        }
        if(args.name) list = list.filter(book => book.authorName === args.name)
        return list
    },
    allAuthors: async () => {
        let authors = await Author.find({})
        let books = await Book.find({})
        for(let i in authors){
            authors[i].bookCount = books.filter(book => book.author.toString() === authors[i].id.toString()).length
        }
        return authors
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
        const book = new Book({...args})
        const authors = await Author.find({})

        const currentUser = context.currentUser

        if (!currentUser) {
          throw new GraphQLError('Not logged in', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }

        if(!authors.find(a => a.name === args.author)){
          const author = new Author({name: args.author})
          book.author = author.id
          try {
            await author.save()
          } catch (error) {
            throw new GraphQLError('Creating new author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
                error
              }
            })
          }
        } else {
          const author = authors.find(a => a.name === args.author)
          book.author = author.id
        }
        try {
          await book.save()
        } catch (error) {
          throw new GraphQLError('Creating new book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }
        return book
    },
    editAuthor: async (root, args, context) => {
        const author = await Author.findOne({name: args.name})

        const currentUser = context.currentUser
      
        if (!currentUser) {
          throw new GraphQLError('Not logged in', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }

        if(author){
          author.born = args.born
          author.save()
        }
    },
    createUser: async (root, args) => {
      const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})

      return user.save()
      .catch(error => {
        throw new GraphQLError('Creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if(!user || args.password !== 'secret'){
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: [args.password, args.user],
            error
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})