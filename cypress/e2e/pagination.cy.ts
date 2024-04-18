/// <reference types="cypress"/>

describe("Should verify pagination functionality", () => {
    beforeEach(() => {
        cy.visit('/')
      })

    it('Should click on next and have current page update', () =>{
        cy.wait(1500);
        cy.get('#current-page').should('have.text', "1")
        cy.get('.page_next__cJGu8').click()
        cy.get('#current-page').should('have.text', "2")
    })

    it('Should click on previous and have current page update', () =>{
        cy.wait(1500);
        cy.get('.page_next__cJGu8').click()
        cy.get('#current-page').should('have.text', "2")

        cy.wait(1500);
        cy.get('.page_previous__6dKoR').click()
        cy.get('#current-page').should('have.text', "1")
    })

    it("Shouldn't change page when clicking previous in the first page", () =>{
        cy.wait(1500);
        cy.get('.page_cardsGrid__PRUGV > :nth-child(1)').should('contain.text', 'Luke Skywalker')
        cy.get('.page_previous__6dKoR').click()
        cy.get('#current-page').should('have.text', "1")
        cy.get('.page_cardsGrid__PRUGV > :nth-child(1)').should('contain.text', 'Luke Skywalker')
    })

    it("Shouldn't change page when clicking next in the last page", () =>{
        cy.wait(1500);
        for (let i = 0; i < 11; i++){
            console.log(i)
            cy.get('.page_next__cJGu8').click()
            cy.wait(500);
        }

        cy.get('#current-page').should('have.text', "9")
        cy.get('.page_cardsGrid__PRUGV > :nth-child(1)').should('contain.text', 'Sly Moore')    
    })
    
})