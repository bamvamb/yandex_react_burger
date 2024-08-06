
import { lsUserKeys } from '../../src/services/tokens'
import { ingredientBun, ingredientMain, constructorBun, constructorMain,
    modal, modalOverlay, modalCloseBtn, 
    orderBody, activeCreateOrderBtn} from "../support/element-varaibles"


describe.only( 'order modal check', () => {
    beforeEach(() => {
        const ls_mock = {...lsUserKeys}
        cy.window().then(win => {
            Object.keys(ls_mock).forEach( key => {
                win.localStorage.setItem(key, ls_mock[key])
            })
            cy.intercept("GET", "api/ingredients", {fixture: "ingredients"}).as("ingredients")
            cy.intercept("POST", "api/orders", {fixture: "order"}).as("order")
            cy.visit('')
        })
    })

    it('create burger and click on create order button must open order modal. click on overlay or close btn - must close it', () => {
        cy.wait('@ingredients').then(() => {
            cy.drag(ingredientBun, constructorBun).then(() => {
                cy.drag(ingredientMain, constructorMain, () => {
                    cy.get(activeCreateOrderBtn).then( btn => {
                        btn[0].click()
                        cy.get(modal).should('exist')
                        cy.get(modalOverlay).should('exist')
                        cy.wait('@order').then(() => {
                            cy.get(orderBody).should('exists')
                            cy.get(modalOverlay).should('exist')
                            cy.get(modalCloseBtn).then(( close_btn )=>{
                                close_btn[0].click()
                                cy.get(modalOverlay).should('not.exist')
                                cy.get(modal).should('not.exist')
                                cy.get(orderBody).should('not.exist')
                            })
                        })
                    })
                    cy.get(activeCreateOrderBtn).then( btn => {
                        btn[0].click()
                        cy.get(modal).should('exist')
                        cy.get(modalOverlay).should('exist')
                        cy.wait('@order').then(() => {
                            cy.get(orderBody).should('exists')
                            cy.get(modalOverlay).should('exist').then(( overlay )=>{
                                overlay[0].click()
                                cy.get(modalOverlay).should('not.exist')
                                cy.get(modal).should('not.exist')
                                cy.get(orderBody).should('not.exist')
                            })
                        })
                    })
                })
            })
            

            cy.get('[data-testid=burger-ingredient-main]').then( ingredient => {
                ingredient[0].click()
                cy.get(modal).should('exist')
                cy.get('[data-testid=ingredient-details]').should('exist')
                cy.get(modalCloseBtn).should('exist').then( btnclose => {
                    btnclose[0].click()
                    cy.get(modalOverlay).should('not.exist')
                    cy.get(modal).should('not.exist')
                    cy.get('[data-testid=ingredient-details]').should('not.exist')
                }) 
            })
        })
    })
})