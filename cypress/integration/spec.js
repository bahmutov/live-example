/// <reference types="cypress" />

it('adds and removes todos', () => {
  cy.request('POST', '/reset', { todos: [] })
  cy.visit('/')
  cy.get('.new-todo').type('Brush teeth{enter}').type('eat{enter}')
  cy.get('.todo-list li')
    .should('have.length', 2)
    .first()
    .find('.destroy')
    .click({ force: true })
  cy.get('.todo-list li').should('have.length', 1)
  cy.contains('li', 'eat').should('be.visible')
})
