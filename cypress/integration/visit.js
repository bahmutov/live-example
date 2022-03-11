/// <reference types="cypress" />

it('retries visit if the server is down', () => {
  cy.visit('/')
})
