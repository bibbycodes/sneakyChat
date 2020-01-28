/// <reference types="Cypress" />

context('Conversation', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    });
  

    .click()
    .type('H').should('have.value', 'H')

    .should('have.value', 'slow.typing@email.com')



    it('.submit() - submit a form', () => {
      // https://on.cypress.io/submit
      cy.get('.action-form')
        .find('[type="text"]').type('HALFOFF')
      cy.get('.action-form').submit()
        .next().should('contain', 'Your form has been submitted!')
    })

  });

