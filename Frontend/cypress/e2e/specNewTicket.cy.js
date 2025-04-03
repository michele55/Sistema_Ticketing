describe('Creazione Nuovo Ticket da parte del Customer', () => {
    it('Login come customer, clic su NUOVO TICKET e invio ticket', () => {
      // 1. Visita la pagina di login
      cy.visit('http://localhost:9000/#/');
  
      // 2. Login come customer
      cy.get('input[name="Email"]').type('customer@example.com');
      cy.get('input[name="Password"]').type('password');
      cy.get('button[type="submit"]').click();
  
      // 3. Verifica che sia nella dashboard
      cy.url().should('include', '/Dashboard');
  
      // 4. Clic su "NUOVO TICKET"
      cy.get('.q-tab').contains('Nuovo Ticket').click();

  
      // 5. Inserisce titolo e descrizione
      const titolo = 'Bug test Cypress ' + Date.now();
      cy.get('[data-cy="input-titolo"]').type(titolo);
      cy.get('[data-cy="input-descrizione"]').type('Questo ticket è stato creato automaticamente durante un test.');
  
      // Invia
      cy.get('[data-cy="btn-invia"]').click();
  
   
      cy.get('.q-notification')
      .should('be.visible')
      .and('contain', 'Ticket creato con successo!');
      // 7. Verifica che il nuovo ticket sia stato creato e visibile nella lista
      cy.contains('Ticket Aperti').click();
      cy.contains(titolo, { timeout: 5000 }).should('exist');
    });
  });
  