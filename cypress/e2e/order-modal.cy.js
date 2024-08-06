
import { lsUserKeys } from '../../src/services/tokens'

describe.only( 'order modal check', () => {
    beforeEach(() => {
        const ls_mock = {...lsUserKeys}
        cy.window().then(win => {
            Object.keys(ls_mock).forEach( key => {
                win.localStorage.setItem(key, ls_mock[key])
            })
            cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {fixture: "ingredients"}).as("ingredients")
            cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {fixture: "order"}).as("order")
            cy.visit("http://localhost:3000")
        })
    })

    it('create burger and click on create order button must open order modal. click on overlay or close btn - must close it', () => {
        cy.wait('@ingredients').then(() => {
            cy.drag('[data-testid=burger-ingredient-bun]', '[data-testid=burger-constructor-bun]').then(() => {
                cy.drag('[data-testid=burger-ingredient-main]', '[data-testid=burger-constructor-main]', () => {
                    cy.get('[data-testid=btn-create-order]:not([disabled=""]').then( btn => {
                        btn[0].click()
                        cy.get('[data-testid=modal]').should('exist')
                        cy.get('[data-testid=modal-overlay]').should('exist')
                        cy.wait('@order').then(() => {
                            cy.get('[data-testid=full-order-card]').should('exists')
                            cy.get('[data-testid=modal-overlay]').should('exist')
                            cy.get('[data-testid=modal-btn-close]').then(( close_btn )=>{
                                close_btn[0].click()
                                cy.get('[data-testid=modal-overlay]').should('not.exist')
                                cy.get('[data-testid=modal]').should('not.exist')
                                cy.get('[data-testid=ingredient-details]').should('not.exist')
                            })
                        })
                    })
                    cy.get('[data-testid=btn-create-order]:not([disabled=""]').then( btn => {
                        btn[0].click()
                        cy.get('[data-testid=modal]').should('exist')
                        cy.get('[data-testid=modal-overlay]').should('exist')
                        cy.wait('@order').then(() => {
                            cy.get('[data-testid=full-order-card]').should('exists')
                            cy.get('[data-testid=modal-overlay]').should('exist').then(( overlay )=>{
                                overlay[0].click()
                                cy.get('[data-testid=modal-overlay]').should('not.exist')
                                cy.get('[data-testid=modal]').should('not.exist')
                                cy.get('[data-testid=ingredient-details]').should('not.exist')
                            })
                        })
                    })
                })
            })
            

            cy.get('[data-testid=burger-ingredient-main]').then( ingredient => {
                ingredient[0].click()
                cy.get('[data-testid=modal]').should('exist')
                cy.get('[data-testid=ingredient-details]').should('exist')
                cy.get('[data-testid=modal-btn-close]').should('exist').then( btnclose => {
                    btnclose[0].click()
                    cy.get('[data-testid=modal-overlay]').should('not.exist')
                    cy.get('[data-testid=modal]').should('not.exist')
                    cy.get('[data-testid=ingredient-details]').should('not.exist')
                }) 
            })
        })
    })
})