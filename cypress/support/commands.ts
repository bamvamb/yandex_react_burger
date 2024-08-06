/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

//Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

declare namespace Cypress {
    interface Chainable {
      drag(subject: string, target: string, options?: any, callback?: () => void): Chainable;
    }
}

Cypress.Commands.add('drag', (subject, target, options, callback) => {
    cy.get(subject).then( $subject => {
        cy.get(target).then($target => {
            const dragStartEvent = new Event('dragstart', { bubbles: true });
            const dragEvent = new Event('drag', { bubbles: true });
            const dragEndEvent = new Event('dragend', { bubbles: true });
            const dropEvent = new Event('drop', { bubbles: true });
            $subject[0].dispatchEvent(dragStartEvent);
            $target[0].dispatchEvent(dragEvent);
            $target[0].dispatchEvent(dropEvent);
            $target[0].dispatchEvent(dragEndEvent);
            if(callback){ callback() }
        });
    })
});