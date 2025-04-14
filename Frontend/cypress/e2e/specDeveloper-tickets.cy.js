describe('Dashboard sviluppatore - visibilità ticket assegnati', () => {
    it('Mostra solo i ticket assegnati allo sviluppatore', () => {
      const email = 'developer@example.com';
      const password = 'password';
      const nome = 'Developer'; // usato per confermare il nome nell'interfaccia
      // 1. Login come sviluppatore
      cy.visit('http://localhost:9000/#/');
      cy.get('input[name="Email"]').type(email);
      cy.get('input[name="Password"]').type(password);
      cy.get('button[type="submit"]').click();
      // 2. Verifica che sia visibile la dashboard e il nome dell’utente loggato
      cy.contains(`Benvenuto, ${nome}`).should('be.visible');
      // 3. Verifica che ogni ticket mostrato contenga “Assegnato a: Developer”
      cy.get('.ticket-item').each(($ticket) => {
        cy.wrap($ticket).should('contain.text', 'Assegnato a:');
        cy.wrap($ticket).should('contain.text', nome);
      });
      // 4. (Opzionale) Verifica che non compaiano ticket non assegnati
      cy.get('.ticket-item').should('not.contain.text', 'Assegnato a: null');
    });
  });
  