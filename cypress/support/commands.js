Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('João Paulo')
      cy.get('#lastName').type('Lourenço')
      cy.get('#email').type('jotamud@gmail.com')
      cy.get('#open-text-area').type('Teste')
      cy.contains('button', 'Enviar').click()
      cy.get('.success').should('be.visible')
})
