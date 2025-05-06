# 🎫 Sistema di Ticketing

Questo progetto è un'applicazione full-stack per la gestione di ticket di supporto, sviluppata come progetto di tirocinio. Il sistema consente agli utenti di aprire ticket, comunicare tramite messaggi e monitorare lo stato di avanzamento, mentre gli amministratori possono assegnare ticket agli sviluppatori e gestire la risoluzione.

## 🔧 Tecnologie utilizzate

### Backend
- [NestJS](https://nestjs.com/) – framework backend basato su Node.js
- TypeORM – ORM per la gestione del database
- PostgreSQL – Database relazionale
- Passport & JWT – Autenticazione e gestione dei ruoli
- bcrypt – Hashing delle password

### Frontend
- [Vue.js](https://vuejs.org/) – Framework JavaScript per interfacce reactive
- [Quasar Framework](https://quasar.dev/) – UI toolkit per Vue
- Axios – Client HTTP per interagire con le API

### Testing
- [Cypress](https://www.cypress.io/) – End-to-End testing
- [Mochawesome](https://github.com/adamgruber/mochawesome) – Report dei test automatici

---

## 🚀 Funzionalità principali

- Registrazione e login degli utenti
- Creazione e visualizzazione dei ticket
- Assegnazione dei ticket da parte degli admin
- Chat in tempo reale tra utente e sviluppatore su ogni ticket
- Gestione dello stato del ticket: `open`, `in_progress`, `closed`
- Ruoli: `Admin`, `Sviluppatore`, `Utente`
- Accesso ai ticket basato sul ruolo
- Interfaccia responsive sviluppata con Quasar
- Report test automatizzati in formato HTML

---


