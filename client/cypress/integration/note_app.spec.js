describe('Note App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')

    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Lautaro',
      username: 'lautyriveros',
      password: 'testpass'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  it('frontpage can be opened', () => {
    cy.contains('Notes')
  })

  it('login form can be opened', () => {
    cy.contains('Show Login').click()
  })

  it('user can login', () => {
    cy.contains('Show Login').click()
    cy.get('#username').type('lautyriveros')
    cy.get('#password').type('testpass')
    cy.get('#form-login-button').click()

    cy.contains('Show Login').should('not.exist')
    cy.contains('Show Create Note').should('exist')
  })

  it('login fails with wrong password', () => {
    cy.contains('Show Login').click()
    cy.get('#username').type('lautyriveros')
    cy.get('#password').type('wrongpassword')
    cy.get('#form-login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Lautaro logged in')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'lautyriveros', password: 'testpass' })
    })

    it('a new note can be created', () => {
      cy.contains('Show Create Note').click()
      cy.get('#note').type('a note created by cypress')
      cy.get('#save-note').click()
      cy.contains('a note created by cypress')
    })

    it('could be marked as important', () => {
      cy.contains('Show Create Note').click()
      cy.get('#note').type('another note created by cypress')
      cy.get('#save-note').click()

      cy.contains('another note created by cypress')
        .parent()
        .find('button')
        .as('theButton')

      cy.get('@theButton').click()
      cy.get('@theButton').should('contain', 'make not important')
    })
  })
})
