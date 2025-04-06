describe('Protezione delle rotte - accesso non autenticato', () => {
    it('Reindirizza alla pagina di login se si accede a /dashboard senza login', () => {
      cy.clearLocalStorage(); // Rimuove eventuali token
      cy.visit('http://localhost:9000/#/dashboard');
  
      // Verifica che l'utente venga reindirizzato alla pagina di login
      cy.url().should('include', '/#/'); // login è la root
      cy.contains('Accedi').should('be.visible'); // o qualsiasi testo presente nel login
    });
  
    it('Reindirizza alla login se si accede a una pagina chat senza login', () => {
      cy.clearLocalStorage();
      cy.visit('http://localhost:9000/#/chat/1'); // ID fittizio, serve solo il controllo della guardia
  
      cy.url().should('include', '/#/'); // Reindirizzato
      cy.contains('Accedi').should('be.visible');
    });
  });
  