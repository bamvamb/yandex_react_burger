
import { ingredientBun, ingredientMain, 
    modal, modalOverlay, modalCloseBtn, ingredientBody } from "../support/element-varaibles"


describe( 'ingredient modal check', () => {
    beforeEach(() => {
        cy.intercept("GET", "api/ingredients", {fixture: "ingredients"}).as("ingredients")
        cy.visit('')
    })

    it('click on any ingredient must open modal, click on overlay or close btn - must close it', () => {
        cy.wait('@ingredients').then(() => {
            cy.get(ingredientBun).then( ingredient => {
                ingredient[0].click()
                cy.get(modal).should('exist')
                cy.get(ingredientBody).should('exist')
                cy.get(modalOverlay).should('exist').then(( overlay )=>{
                    overlay[0].click()
                    cy.get(modalOverlay).should('not.exist')
                    cy.get(modal).should('not.exist')
                    cy.get(ingredientBody).should('not.exist')
                })
            })
            
            cy.get(ingredientMain).then( ingredient => {
                ingredient[0].click()
                cy.get(modal).should('exist')
                cy.get(ingredientBody).should('exist')
                cy.get(modalCloseBtn).should('exist').then( btnclose => {
                    btnclose[0].click()
                    cy.get(modalOverlay).should('not.exist')
                    cy.get(modal).should('not.exist')
                    cy.get(ingredientBody).should('not.exist')
                }) 
            })
        })
    })
})