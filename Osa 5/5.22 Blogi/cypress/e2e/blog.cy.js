describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Pekka',
      username: 'Pekka',
      password: '123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Pekka')
      cy.get('#password').type('123')
      cy.get('#login-button').click()
      cy.contains('Pekka logged in')
    })
    it('fails with incorrect credentials', function() {
      cy.get('#username').type('Pekka')
      cy.get('#password').type('12')
      cy.get('#login-button').click()
      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Pekka', password: '123' })
      cy.contains('Pekka logged in')
      cy.get('#create-blog-button').click()
      cy.get('#Title').type('A blog')
      cy.get('#Author').type('An author')
      cy.get('#URL').type('A link')
      cy.get('#add-blog-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('A blog by An author')
    })

    it('A blog can be liked', function () {
      cy.contains('A blog by An author')

      cy.get('#view-button').click()
      cy.contains('Likes:')
      cy.get('#like-button').click()
      cy.contains('Likes: 1')
      cy.get('#like-button').click()
      cy.contains('Likes: 2')
    })

    it('A blog can be deleted', function () {
      cy.get('#view-button').click()
      cy.get('#delete-button').click()
      cy.contains('Blog deleted')
      cy.contains('A blog by An author').should('not.exist')
    })

    it('Only owner can see delete', function () {
      cy.request('POST', 'http://localhost:3003/api/users/', { username: 'Antti', name: 'Antti', password: '123' })
      cy.login({ username: 'Antti', password: '123' })
      cy.contains('Antti logged in')
      cy.get('#view-button').click()
      cy.get('#delete-button').should('not.exist')
    })


    it.only('Blogs are sorted by likes', function () {
      cy.wait(5000)
      cy.createBlog({ title: 'A blog number one', author: 'Author', url: 'Link' })
      cy.wait(5000)
      cy.createBlog({ title: 'A blog number two', author: 'Author', url: 'Link' })
      cy.wait(5000)
      cy.createBlog({ title: 'A blog number three', author: 'Author', url: 'Link' })
      cy.wait(5000)

      cy.contains('A blog number one')
        .contains('view').click()
      cy.get('#like-button').click()
      cy.get('#hide-button').click()

      cy.contains('A blog number two')
        .contains('view').click()
      cy.get('#like-button').click()
      cy.get('#like-button').click()
      cy.get('#hide-button').click()

      cy.contains('A blog number three')
        .contains('view').click()
      cy.get('#like-button').click()
      cy.get('#like-button').click()
      cy.get('#like-button').click()
      cy.get('#hide-button').click()

      cy.get('.blog').eq(0).should('contain', 'A blog number three')
      cy.get('.blog').eq(1).should('contain', 'A blog number two')
      cy.get('.blog').eq(2).should('contain', 'A blog number one')
      cy.get('.blog').eq(3).should('contain', 'A blog by An author')
    })
  })
})