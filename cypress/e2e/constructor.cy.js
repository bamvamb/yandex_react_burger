

describe( 'constructor dnd check', () => {
    beforeEach(() => {
        cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {fixture: "ingredients"}).as("ingredients")
        cy.visit("http://localhost:3000/")
    })

    it('bun drop to constructor bun should create element in constructor bun', () => {
        cy.wait('@ingredients').then(() => {
            cy.drag('[data-testid=burger-ingredient-bun]', '[data-testid=burger-constructor-bun]', {}, () => {
                cy.get('[data-testid=burger-constructor-dropped-bun]').should('exist')
            })
        })
    })

    it('bun drop to constructor bun should not create element in constructor', () => {
        cy.wait('@ingredients').then(() => {
            cy.drag('[data-testid=burger-ingredient-bun]', '[data-testid=burger-constructor-main]', {}, () => {
                cy.get('[data-testid=burger-constructor-dropped-bun]').should('not.exist')
            })
        })
    })

    it('main element drop to constructor should create element in constructor', () => {
        cy.wait('@ingredients').then(() => {
            cy.drag('[data-testid=burger-ingredient-main]', '[data-testid=burger-constructor-main]', {}, () => {
                cy.get('[data-testid=burger-constructor-dropped-main]').should('exist')
            })
        })
    })

    it('main element drop to bun should not create element in constructor', () => {
        cy.wait('@ingredients').then(() => {
            cy.drag('[data-testid=burger-ingredient-main]', '[data-testid=burger-constructor-bun]', {}, () => {
                cy.get('[data-testid=burger-constructor-dropped-main]').should('not.exist')
            })
        })
    })

})