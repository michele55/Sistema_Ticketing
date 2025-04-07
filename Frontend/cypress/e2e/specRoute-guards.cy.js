describe('Protezione delle rotte - accesso non autenticato', () => {
  it('Reindirizza alla pagina di login se si accede a /dashboard senza login', () => {
    cy.clearLocalStorage();
    cy.visit('http://localhost:9000/#/dashboard');
    cy.location('hash', { timeout: 5000 }).should('eq', '#/login');
    cy.contains('Login').should('be.visible');
  });

  it('Reindirizza alla pagina di login se si accede a una chat senza login', () => {
    cy.clearLocalStorage();
    cy.visit('http://localhost:9000/#/chat/1');
    cy.location('hash', { timeout: 5000 }).should('eq', '#/login');
    cy.contains('Login').should('be.visible');
  });
});

describe('Accesso autenticato con token reale', () => {
  let token;

  beforeEach(() => {
    // Login via API per ottenere il token
    cy.request('POST', 'http://localhost:3000/auth/login', {
      email: 'admin@example.com',
      password: 'password'
    }).then((res) => {
      token = res.body.access_token;
      window.localStorage.setItem('token', token);
    });
  });

  it('Accede correttamente alla dashboard se autenticato', () => {
    cy.visit('http://localhost:9000/#/dashboard');
    cy.contains('Benvenuto, Admin').should('be.visible');
  });

  it('Accede correttamente alla pagina chat', () => {
    cy.visit('http://localhost:9000/#/chat/1'); // esempio di chat
    cy.get('[data-cy="chat-input"]').should('have.attr', 'placeholder', 'Scrivi un messaggio...');
    // o un qualsiasi elemento della chat
  });
});

describe('Ticket chiuso - sola lettura', () => {
  let token;

  beforeEach(() => {
    cy.request('POST', 'http://localhost:3000/auth/login', {
      email: 'customer@example.com',
      password: 'password'
    }).then((res) => {
      token = res.body.access_token;
      window.localStorage.setItem('token', token);
    });
  });

  it('Blocca l\'invio messaggi se il ticket è chiuso', () => {
    // ⚠️ usa l'ID di un ticket chiuso esistente
    cy.visit('http://localhost:9000/#/chat/1');

    cy.contains('Questo ticket è stato chiuso').should('be.visible');
    cy.get('[data-cy="chat-input"]').should('be.disabled');
  });
});
