const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: 'e2e/spec.{cy,cy.js,js,ts}',
    supportFile: 'support/e2e.js', 
    setupNodeEvents(on, config) {
      // Qui puoi definire eventuali eventi Node se necessario
    },
  },
});
