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
      cy.login({username: 'Pekka', password: '123'})
      cy.contains('Pekka logged in')
    })

    it.only('A blog can be created', function () {
      cy.get('#create-blog-button').click()
      cy.get('#Title').type('A blog')
      cy.get('#Author').type('An author')
      cy.get('#URL').type('A link')
      cy.get('#add-blog-button').click()
      cy.contains('A blog by An author')
    })
  })
}) 