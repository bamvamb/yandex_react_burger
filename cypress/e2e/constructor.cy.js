
import { droppedBun, ingredientBun, constructorBun, 
    droppedMain, constructorMain, ingredientMain } from "../support/element-varaibles"

describe( 'constructor dnd check', () => {
    beforeEach(() => {
        cy.intercept("GET", "api/ingredients", {fixture: "ingredients"}).as("ingredients")
        cy.visit('')
    })

    it('bun drop to constructor bun should create element in constructor bun', () => {
        cy.wait('@ingredients').then(() => {
            cy.drag(ingredientBun, constructorBun, {}, () => {
                cy.get(droppedBun).should('exist')
            })
        })
    })

    it('bun drop to constructor bun should not create element in constructor', () => {
        cy.wait('@ingredients').then(() => {
            cy.drag(ingredientBun, constructorMain, {}, () => {
                cy.get(droppedBun).should('not.exist')
            })
        })
    })

    it('main element drop to constructor should create element in constructor', () => {
        cy.wait('@ingredients').then(() => {
            cy.drag(ingredientMain, constructorMain, {}, () => {
                cy.get(droppedMain).should('exist')
            })
        })
    })

    it('main element drop to bun should not create element in constructor', () => {
        cy.wait('@ingredients').then(() => {
            cy.drag(ingredientMain, ingredientBun, {}, () => {
                cy.get(droppedMain).should('not.exist')
            })
        })
    })

})