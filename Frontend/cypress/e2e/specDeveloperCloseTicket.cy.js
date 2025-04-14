describe('Sviluppatore - chiusura ticket', () => {
    it('Chiude un ticket assegnato con motivazione e verifica che sia nei ticket chiusi', () => {
      const email = 'developer@example.com';
      const password = 'password';
      const nome = 'Developer';
      const motivazione = `Chiusura Cypress ${Date.now()}`;
      // 1. Login
      cy.visit('http://localhost:9000/#/');
      cy.get('input[name="Email"]').type(email);
      cy.get('input[name="Password"]').type(password);
      cy.get('button[type="submit"]').click();
      cy.contains(`Benvenuto, ${nome}`).should('be.visible');
      // 2. Precondizione: almeno un ticket assegnato
      cy.get('.ticket-item')
        .its('length')
        .should('be.gte', 1);
      // 3. Clicca su "Chiudi Ticket" del primo ticket assegnato
      cy.get('.ticket-item').first().within(() => {
        cy.contains('Chiudi Ticket').click();
      });
      // 4. Inserisce la motivazione e salva
      cy.get('.q-dialog').within(() => {
        cy.contains('label', 'Indica le motivazioni della chiusura')
          .parent()
          .find('input')
          .type(motivazione);
  
        cy.contains('button', 'Salva').click();
      });
      // 5. Verifica chiusura dialog
      cy.get('.q-dialog').should('not.exist');
      // 6. Verifica notifica di successo
      cy.get('.q-notification').should('contain.text', 'Ticket chiuso con successo');
      // 7. Passa a tab "Ticket Chiusi"
      cy.contains('.q-tab', 'Ticket Chiusi').click();
      // 8. Verifica che il ticket chiuso sia presente
      cy.get('.ticket-item').first().find('.q-badge').should('contain.text', 'CHIUSO');
    });
  });
  