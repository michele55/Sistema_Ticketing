describe('Login Test', () => {
  it('Effettua il login con credenziali valide', () => {
    // 1. Visita la pagina di login
    cy.visit('http://localhost:9000/#/'); 

    // 2. Inserisce email e password
    cy.get('input[name="Email"]').type('admin@example.com'); 
    cy.get('input[name="Password"]').type('password'); 

    // 3. Clicca il pulsante di login
    cy.get('button[type="submit"]').click();

    // 4. Controlla che il login abbia successo (es: reindirizzamento alla dashboard)
    cy.url().should('include', '/Dashboard'); // Verifica che l'utente sia reindirizzato

    // 5. Controlla che il nome utente o un elemento specifico sia visibile
    cy.contains('Benvenuto, Admin'); 
  });
});
