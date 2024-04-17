// ***********************************************
// This example commands.js shows you how to
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
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type("TESTE");
    cy.get('#lastName').type("TEstesss");
    cy.get('#email').type("emailteste@gmail.com");
    cy.get('#phone').type("111111111111");
    cy.get('#open-text-area').type('TESTETESTETEST');
    cy.contains('button', 'Enviar').click();
});
Cypress.Commands.add('checkGeral',  function(){  
    cy.get('input[type="radio"]').should('have.length', 3)
    .each(function($radio){
      cy.wrap($radio).check();
      cy.wrap($radio).should('be.checked');
    })
});