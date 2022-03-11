/// <reference types="cypress" />

it('retries visit if the server is down', () => {
  function checkServer() {
    cy.wrap(
      fetch('/').then(
        (response) => {
          return { response }
        },
        (error) => {
          return { error }
        }
      )
    ).then(({ response, error }) => {
      if (!error) {
        cy.log('server responds')
        return
      }
      cy.wait(1000, { log: false }).then(checkServer)
    })
  }

  checkServer()
  cy.visit('/')
})

it('overwrites cy.visit', () => {
  Cypress.Commands.overwrite('visit', (visit, url) => {
    function checkServer() {
      return cy
        .wrap(
          fetch(url).then(
            (response) => {
              return { response }
            },
            (error) => {
              return { error }
            }
          )
        )
        .then(({ response, error }) => {
          if (!error) {
            cy.log('server responds')
            return
          }
          cy.wait(1000, { log: false }).then(checkServer)
        })
    }

    checkServer().then(() => visit(url))
  })
  cy.visit('/')
})
