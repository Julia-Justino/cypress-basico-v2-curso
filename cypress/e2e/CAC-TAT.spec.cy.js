//<reference types="Cypress" />
beforeEach(() => {
  cy.visit('../src/index.html');
});
describe('Central de Atendimento ao Cliente TAT', function () {
  it('verifica o título da aplicação', function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
  it('Verifica se o formulário foi preenchido corretamente', () => {
    cy.get('#firstName').type("TESTE");
    cy.get('#lastName').type("TEstesss");
    cy.get('#email').type("emailteste@gmail.com");
    cy.get('#open-text-area').type('TESTETESTETEST', { delay: 0 });
    cy.contains('button', 'Enviar').click();
    cy.get('.success').should('be.visible').contains('Mensagem enviada com sucesso.');
  });
  it('Verifica se o formulário apresenta erro', () => {
    cy.get('#firstName').type("TESTE");
    cy.get('#lastName').type("TEstesss");
    cy.get('#email').type("emailteste@=gmail.com");
    cy.get('#open-text-area').type('TESTETESTETEST', { delay: 0 });
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible').contains('Valide os campos obrigatórios!');
  });
  it('Verifica telefone se torna obrigatório mas não é preenchido', () => {
    cy.get('#firstName').type("TESTE");
    cy.get('#lastName').type("TEstesss");
    cy.get('#email').type("emailteste@=gmail.com");
    cy.get('#open-text-area').type('TESTETESTETEST', { delay: 0 });
    cy.get('#phone-checkbox').click();
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible').contains('Valide os campos obrigatórios!');
  });
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible').contains('Mensagem enviada com sucesso.');
  });

  it('Verifica se o formulário foi apagado corretamente', () => {
    cy.get('#firstName').type("TESTE").should('have.value', 'TESTE').clear().should("have.value", '');
    cy.get('#lastName').type("TEstesss").should('have.value', 'TEstesss').clear().should("have.value", '');
    cy.get('#email').type("emailteste@gmail.com").should('have.value', 'emailteste@gmail.com').clear().should("have.value", '');
    cy.get('#phone').type("11111111111").should('have.value', '11111111111').clear().should("have.value", '');
  });
  it('Valida exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('have.class', 'error')
  });
})