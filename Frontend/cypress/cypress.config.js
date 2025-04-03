const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: false},
  e2e: {
    specPattern: 'e2e/*.{cy,cy.js,js,ts}',
    supportFile: 'support/e2e.js', 
    setupNodeEvents(on, config) {
      // Qui puoi definire eventuali eventi Node se necessario
    },
  },
});
