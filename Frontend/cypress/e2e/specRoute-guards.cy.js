describe('Protezione delle rotte - accesso non autenticato', () => {
    it('Reindirizza alla pagina di login se si accede a /dashboard senza login', () => {
      cy.clearLocalStorage(); // Elimina eventuali token
      cy.visit('http://localhost:9000/#/dashboard');
  
      // Verifica che il reindirizzamento avvenga a /login
      cy.location('hash', { timeout: 5000 }).should('eq', '#/login');
  
      // Verifica che un contenuto della login sia visibile
      cy.contains('Login').should('be.visible');
    });
  
    it('Reindirizza alla pagina di login se si accede a una chat senza login', () => {
      cy.clearLocalStorage();
      cy.visit('http://localhost:9000/#/chat/1'); // ID fittizio, serve solo per testare la guardia
  
      cy.location('hash', { timeout: 5000 }).should('eq', '#/login');
  
      cy.contains('Login').should('be.visible');
    });
  });
  