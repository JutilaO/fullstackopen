import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query allBooks($name: String, $genre: String){
    allBooks(name: $name, genre: $genre) {
        title
        author
        published
        authorName
        genres
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int! $genres: [String]){
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
    ){
        title
        author
        published
        genres
    }
  }
`

export const EDIT_BORN = gql`
  mutation editAuthor($name: String!, $born: Int!){
    editAuthor(name: $name, born: $born){
        name
        born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
        value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author
      published
      authorName
      genres
    }
  }
`