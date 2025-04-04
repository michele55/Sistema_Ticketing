describe('Assegnazione ticket da parte dell\'admin', () => {
    const timestamp = Date.now();
const titoloTicket = `Titolo: Ticket Cypress ${timestamp}`;
    const descrizione = 'Test automatico per assegnazione da parte admin';
  
    it('Customer crea ticket, admin lo assegna', () => {
      // === LOGIN CUSTOMER E CREAZIONE TICKET ===
      cy.visit('http://localhost:9000/#/');
  
      cy.get('input[name="Email"]').type('customer@example.com');
      cy.get('input[name="Password"]').type('password');
      cy.get('button[type="submit"]').click();
      cy.get('.q-tab').contains('Nuovo Ticket').click();
      cy.get('[data-cy="input-titolo"]').type(titoloTicket);
      cy.get('[data-cy="input-descrizione"]').type(descrizione);
      cy.get('[data-cy="btn-invia"]').click();
      cy.get('.q-notification').should('contain', 'Ticket creato con successo!');
      cy.contains('Ticket Aperti').click();
      cy.contains(titoloTicket, { timeout: 5000 }).should('exist');
  
      // === LOGOUT CUSTOMER ===
      cy.get('button').contains('Logout').click(); // ← assicurati che il logout abbia un pulsante cliccabile
  
      // === LOGIN COME ADMIN ===
      cy.get('input[name="Email"]').type('admin@example.com');
      cy.get('input[name="Password"]').type('password');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/Dashboard');
  
    // Dopo login e identificazione del ticket da gestire...
    cy.contains(titoloTicket)
    .parents('.q-item') // o '.q-card' se è il contenitore del ticket
    .within(() => {
      cy.get('[data-cy="btn-gestisci"]').click();
    });
  
  // Attendi che il dialogo sia visibile
  cy.get('.q-dialog').should('be.visible');
  
  // Seleziona lo stato "in_progress"
  cy.get('[data-cy="select-stato"]').click();
  cy.contains('.q-item', 'in_progress').click();
  
  cy.get('[data-cy="select-sviluppatore"]')
  .scrollIntoView()
  .click({ force: true });

cy.get('.q-menu', { timeout: 4000 }).should('exist');

cy.get('.q-menu .q-item__label span')
  .contains('Developer')
  .scrollIntoView()
  .click({ force: true });

// 7. Inserisci descrizione
cy.get('[data-cy="input-descrizione"]').type('Assegnazione da test automatico');

// 8. Clicca su "Salva"
cy.get('[data-cy="btn-salva-stato"]').click();

  // Seleziona sviluppatore (es: con ID 2)
  
  
  // Verifica notifica
  cy.get('.q-notification').should('contain', 'Ticket aggiornato con successo!');
  
  // Verifica che il ticket sia in stato aggiornato
  cy.contains(titoloTicket)
  .parents('.ticket-item') // risali fino al contenitore completo del ticket
  .should('contain.text', 'IN_PROGRESS');
  
    });
  });
  