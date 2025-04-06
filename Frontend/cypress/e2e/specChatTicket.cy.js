describe('Cliente - chat del ticket', () => {
    it('Invia un messaggio nella chat del ticket', () => {
      const email = 'customer@example.com';
      const password = 'password';
      const nome = 'Customer';
      const messaggioTest = `Messaggio Cliente ${Date.now()}`;
  
      cy.visit('http://localhost:9000/#/');
      cy.get('input[name="Email"]').type(email);
      cy.get('input[name="Password"]').type(password);
      cy.get('button[type="submit"]').click();
  
      cy.contains(`Benvenuto, ${nome}`).should('be.visible');
  
      cy.get('.ticket-item').first().within(() => {
        cy.contains('Apri dettagli ticket').click();
      });
  
      cy.get('[data-cy="chat-input"]').type(messaggioTest);
cy.contains('button', 'send').click();
cy.wait(1000);

cy.get('[data-cy="chat-msg"]')
  .last()
  .should('contain.text', messaggioTest);
    });
  });
  
  describe('Sviluppatore - chat del ticket assegnato', () => {
    it('Accede al ticket assegnato e invia un messaggio', () => {
      const email = 'developer@example.com';
      const password = 'password';
      const nome = 'Developer';
      const messaggioTest = `Messaggio Dev ${Date.now()}`;
  
      cy.visit('http://localhost:9000/#/');
      cy.get('input[name="Email"]').type(email);
      cy.get('input[name="Password"]').type(password);
      cy.get('button[type="submit"]').click();
  
      cy.contains(`Benvenuto, ${nome}`).should('be.visible');
  
      cy.get('.ticket-item').first().within(() => {
        cy.contains('Apri dettagli ticket').click();
      });
  
      cy.get('[data-cy="chat-input"]').type(messaggioTest);
      cy.contains('button', 'send').click();
      cy.wait(1000);
      cy.get('[data-cy="chat-msg"]')
  .last()
  .should('contain.text', messaggioTest);

    
    });
  });
  
  describe('Admin - chat del ticket', () => {
    it('Accede alla chat di un ticket e invia un messaggio', () => {
      const email = 'admin@example.com';
      const password = 'password';
      const nome = 'Admin';
      const messaggioTest = `Messaggio Admin ${Date.now()}`;
  
      cy.visit('http://localhost:9000/#/');
      cy.get('input[name="Email"]').type(email);
      cy.get('input[name="Password"]').type(password);
      cy.get('button[type="submit"]').click();
  
      cy.contains(`Benvenuto, ${nome}`).should('be.visible');
  
      cy.get('.ticket-item').first().within(() => {
        cy.contains('Apri Chat').click(); // Solo admin ha "Apri Chat"
      });
  
      cy.get('[data-cy="chat-input"]').type(messaggioTest);
cy.contains('button', 'send').click();
cy.wait(1000);
   
      cy.get('[data-cy="chat-msg"]')
  .last()
  .should('contain.text', messaggioTest);

    });
  });
  