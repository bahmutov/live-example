/// <reference types="cypress" />

import { recurse } from 'cypress-recurse'

it('uses cypress-recurse', () => {
  recurse(
    () => {
      return cy.wrap(
        fetch('/').then(
          (response) => {
            return { response }
          },
          (error) => {
            return { error }
          }
        )
      )
    },
    ({ response, error }) => Boolean(response),
    {
      delay: 1000,
      timeout: 60000,
      limit: 60,
      log: false
    }
  )
    // the "recurse" yields whatever
    // the first function yields, in our case
    // it is the { response } object. Let's grab its text
    .its('response')
    .invoke('text')
    .then(console.log)
  cy.visit('/')
})
