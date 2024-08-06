describe( 'ingredient modal check', () => {
    beforeEach(() => {
        cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {fixture: "ingredients"}).as("ingredients")
        cy.visit("http://localhost:3000/")
    })

    it('click on any ingredient must open modal, click on overlay or close btn - must close it', () => {
        cy.wait('@ingredients').then(() => {
            cy.get('[data-testid=burger-ingredient-bun]').then( ingredient => {
                ingredient[0].click()
                cy.get('[data-testid=modal]').should('exist')
                cy.get('[data-testid=ingredient-details]').should('exist')
                cy.get('[data-testid=modal-overlay]').should('exist').then(( overlay )=>{
                    overlay[0].click()
                    cy.get('[data-testid=modal-overlay]').should('not.exist')
                    cy.get('[data-testid=modal]').should('not.exist')
                    cy.get('[data-testid=ingredient-details]').should('not.exist')
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