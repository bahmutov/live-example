/// <reference types="cypress" />

import { recurse } from 'cypress-recurse'

it('uses cypress-recurse', () => {
  // watch the videos
  // "Use cypress-recurse To Ping The Site Before Visiting It"
  //  https://www.youtube.com/watch?v=8rtBk9MBjXA
  // "Access The Response Text Yielded By The Plugin cypress-response"
  //  https://youtu.be/MRelgoMg230
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
