/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
      cy.visit('./src/index.html') 
    })

    it('verifica o título da aplicação', function() {
       cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
      const longText = 'Me chamo joão paulo de sousa lourenço e tenho 31 anos de idade, sou brasiliense e venho estudando para me tornar um QA'

      cy.get('#firstName').type('João Paulo')
      cy.get('#lastName').type('Lourenço')
      cy.get('#email').type('jotamud@gmail.com')
      cy.get('#open-text-area').type(longText, { delay: 0})
      cy.contains('button', 'Enviar').click()
      cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
      cy.get('#firstName').type('João Paulo')
      cy.get('#lastName').type('Lourenço')
      cy.get('#email').type('jotamud.gmail.com')
      cy.get('#open-text-area').type('Teste')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')

    })
   
    it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
      cy.get('#phone')
         .type('abcdefghij')
         .should('have.value', '')
    
    })

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
      cy.get('#firstName').type('João Paulo')
      cy.get('#lastName').type('Lourenço')
      cy.get('#email').type('jotamud@gmail.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('Teste')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email', function(){
      cy.get('#firstName')
        .type('João Paulo')
        .should('have.value', 'João Paulo')
        .clear()
        .should('have.value', '')
      cy.get('#lastName')
        .type('Lourenço')
        .should('have.value', 'Lourenço')
        .clear()
        .should('have.value', '')
      cy.get('#email')
        .type('jotamud@gmail.com')
        .should('have.value', 'jotamud@gmail.com')
        .clear()
        .should('have.value', '')

    })

    it('exibe mensagem de erro ao sbmeter o formulário sem preencher os campos obrigatórios', function(){
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
      
    })

    it('envia o formulário com sucesso usando um comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')

    })

    it('seleciona um produto (Youtube) por seu texto', function(){
      cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria), por seu valor (value)', function (){
      cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
      cy.get('#product')
      .select(1)
      .should('have.value', 'blog')

    })

    it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
      
    })

    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
      .should('have.length',3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')

      })
    })
      
    it('marca ambos checkboxex, depois desmarca o ultimo', function(){
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
      

    })

  })


  