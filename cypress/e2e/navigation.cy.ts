/// <reference types="cypress"/>

describe('Should test navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Should go to details page from home', () => {
    cy.wait(1500)
    cy.get('.page_cardsGrid__PRUGV > :nth-child(1)').should('exist')
    cy.get('.page_cardsGrid__PRUGV > :nth-child(1) > .characterCard_moreDetails__UlT5f').click()
    cy.url().should('include', '1')
  })

  it('Should go to home from details page', () => {
    cy.wait(1500)
    cy.get('.page_cardsGrid__PRUGV > :nth-child(1) > .characterCard_moreDetails__UlT5f').click()
    cy.get('.page_navigationBtn__dr0Qh').should('exist').click()
    cy.url().should('equal', 'http://localhost:3000/')
  })
  
})