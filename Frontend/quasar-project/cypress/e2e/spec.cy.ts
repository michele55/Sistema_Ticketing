// cypress/e2e/example.cy.js

describe('Sistema di Ticketing - Test E2E', () => {

  beforeEach(() => {
    // Effettua il login prima di ogni test
    cy.visit('http://localhost:9000/#/')
    cy.get('input[name="Email"]').type('customer@example.com')
    cy.get('input[name="Password"]').type('password')
    cy.get('button').contains('Login').click()
    cy.contains('Benvenuto').should('be.visible')
  })

  it('Verifica che la dashboard sia visibile dopo il login', () => {
    cy.contains('Benvenuto').should('be.visible')
  })

  it('Crea un nuovo ticket con successo', () => {
    cy.contains('Nuovo Ticket').click()

    cy.get('input[aria-label="Titolo"]').type('Test Ticket')
    cy.get('textarea[aria-label="Descrizione"]').type('Questa è una descrizione di test.')

    cy.contains('Invia').click()
    cy.contains('Ticket creato con successo!').should('be.visible')
  })

  it('Verifica che i ticket aperti siano visibili', () => {
    cy.contains('Ticket Aperti').click()
    cy.contains('Ticket Aperti').should('be.visible')
  })

 /* it('Verifica la gestione di un ticket come Admin', () => {
    cy.contains('Logout').click()

    // Esegui il login come Admin
    cy.visit('http://localhost:9000/#/')
    cy.get('input[name="Email"]').type('admin@example.com')
    cy.get('input[name="Password"]').type('password')
    cy.get('button').contains('Login').click()
    cy.contains('Benvenuto').should('be.visible')

    // Gestione del ticket
    cy.contains('Ticket Aperti').click()
    cy.contains('Gestisci').first().click()

    cy.contains('Cambia Stato').parent().find('.q-select').click()
    cy.contains('.q-item', 'in_progress').click()

    cy.get('input[aria-label="Descrizione"]').type('Ticket in lavorazione.')

    cy.contains('Assegnato a').parent().find('.q-select').first().click()
    cy.get('.q-item').first().click()
    cy.contains('Salva').click()
    cy.contains('Ticket aggiornato con successo!').should('be.visible')
  })

  it('Verifica che i ticket chiusi siano visibili', () => {
    cy.contains('Ticket Chiusi').click()
    cy.contains('Ticket Chiusi').should('be.visible')
  })

  it('Verifica il caricamento delle informazioni utente dal ticket chiuso', () => {
    cy.contains('Ticket Chiusi').click()
    cy.contains('Mostra Info su utente che ha creato ticket').trigger('mouseover')
    cy.contains('Nome:').should('be.visible')
    cy.contains('Email:').should('be.visible')
  })*/
})
