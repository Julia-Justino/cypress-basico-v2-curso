//<reference types="Cypress" />
beforeEach(() => {
  cy.visit('../src/index.html');
});
describe('Central de Atendimento ao Cliente TAT', function () {
  const SEGUNDOS = 3000;
  it('verifica o título da aplicação', function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
  it('Verifica se o formulário foi preenchido corretamente', () => {
    cy.clock();
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible').contains('Mensagem enviada com sucesso.');
    cy.tick(SEGUNDOS);
    cy.get('.success').should('be.not.visible');
  });
  it('Verifica se o formulário apresenta erro', () => {
    cy.clock();
    cy.preencherCamposSemTelefone();
    cy.get('#phone-checkbox').check();
    cy.get('.error').should('be.visible').contains('Valide os campos obrigatórios!');
    cy.tick(SEGUNDOS);
    cy.get('.error').should('be.not.visible');
  });
  it('Verifica telefone se torna obrigatório mas não é preenchido', () => {
    cy.clock();
    cy.preencherCamposSemTelefone();
    cy.get('#phone-checkbox').check();
    cy.get('.error').should('be.visible').contains('Valide os campos obrigatórios!');
    cy.tick(SEGUNDOS);
    cy.get('.error').should('be.not.visible')
  });
  it('Verifica telefone não permite String', () => {
    cy.clock();
    cy.preencherCamposSemTelefone()
    cy.get('#phone').type("abc");
    cy.get('.error').should('be.visible').contains('Valide os campos obrigatórios!');
    cy.tick(SEGUNDOS);
    cy.get('.error').should('be.not.visible');
  });
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.clock();
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible').contains('Mensagem enviada com sucesso.');
    cy.tick(SEGUNDOS);
    cy.get('.success').should('be.not.visible');
  });

  it('Verifica se o formulário foi apagado corretamente', () => {
    cy.clock()
    cy.get('#firstName').type("TESTE").should('have.value', 'TESTE').clear().should("have.value", '');
    cy.get('#lastName').type("TEstesss").should('have.value', 'TEstesss').clear().should("have.value", '');
    cy.get('#email').type("emailteste@gmail.com").should('have.value', 'emailteste@gmail.com').clear().should("have.value", '');
    cy.get('#phone').type("11111111111").should('have.value', '11111111111').clear().should("have.value", '');
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible').contains('Valide os campos obrigatórios!');
    cy.tick(SEGUNDOS);
    cy.get('.error').should('be.not.visible');
  });
  it('Valida exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('have.class', 'error');
  });

  it('Valida opção youtube', () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('#product').select('YouTube').should('have.value', 'youtube');
  });

  it('Valida opção Mentoria', () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('#product').select('mentoria').should('have.value', 'mentoria');
  });

  it('Valida seleciona um produto (Blog)', () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('#product').select(1).should('have.value', 'blog');
  });

  it('Validar marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value = "feedback"]').check().should('have.value', 'feedback');
  });
  
  it('Validar marcação de atendimentos ', () => {
   cy.checkGeral();
  });

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').should('have.length', 2)
    .each(function($radio){
      cy.wrap($radio).check();
      cy.wrap($radio).should('be.checked');
    })
    cy.get('input[type="checkbox"]').last().uncheck().should('have.value', 'phone').should('not.be.checked');
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('[type = "file"]').should('not.have.value')
    .selectFile('/home/user/Documentos/curso/cypress-basico-v2-curso/cypress/fixtures/example.json')
    .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json');
    })
  });

  it('seleciona um arquivo drag-drop ', () => {
    cy.get('[type = "file"]').should('not.have.value')
    .selectFile('/home/user/Documentos/curso/cypress-basico-v2-curso/cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json');
    })
  });


  it('seleciona um arquivo alias ', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('[type = "file"]').should('not.have.value')
    .selectFile('@sampleFile')
    .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json');
    })
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank');
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a').invoke('removeAttr', 'target').click();
  });

  it('Valida exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock();
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible');
    cy.tick(SEGUNDOS);
    cy.get('.success').should('not.be.visible');
  });

  Cypress._.times(5, ()=>{
    it('envia o formuário com sucesso usando um comando customizado', () => {
      cy.clock();
      cy.fillMandatoryFieldsAndSubmit();
      cy.get('.success').should('be.visible').contains('Mensagem enviada com sucesso.');
      cy.tick(SEGUNDOS);
      cy.get('.success').should('be.not.visible');
    });
  });

  it('simulates sending a CTRL+V command to paste a long text on a textarea field', () => {
    const longText = Cypress._.repeat('0123456789', 20)
    cy.get('#open-text-area')
      .invoke('val', longText)
      .should('have.value', longText)
  });

  it('busca elementos corretamente', () => {
   cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').
   should(function(response){
    const {status, statusText, body} = response
    expect(status).to.equal(200)
    expect(statusText).to.equal('OK')
    expect(body).to.include('CAC TAT')
   })
  });

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it.only('Acha Gato', () => {
    cy.get('#cat').should('be.not.visible').invoke('show');
  }); 
})