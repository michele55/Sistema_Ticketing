# 🎫 Sistema di Ticketing

Questo progetto è un'applicazione full-stack per la gestione di ticket di supporto, sviluppata come progetto di tirocinio. Il sistema consente agli utenti di aprire ticket, comunicare tramite messaggi e monitorare lo stato di avanzamento, mentre gli amministratori possono assegnare ticket agli sviluppatori e gestire la risoluzione.

## 🔧 Tecnologie utilizzate

### Backend
- [NestJS](https://nestjs.com/) – framework backend basato su Node.js
- TypeORM – ORM per la gestione del database
- MySQL – Database relazionale
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

---

### Gestione Utenti e Ruoli

<div style="display: flex; flex-direction: row; align-items: flex-start;">
  <div style="flex-basis: 50%; padding-right: 20px;">
    <ul>
      <li>Login degli utenti</li>
      <li>Ruoli definiti: <code>Admin</code>, <code>Sviluppatore</code>, <code>Utente</code>.</li>
      <li>Accesso ai ticket basato sul ruolo.</li>
    </ul>
  </div>
  <div style="flex-basis: 50%;">
    <img width="425" height="315" alt="image" src="https://github.com/user-attachments/assets/ce275e11-ffc0-41ee-9809-b6c1def3575d" />
  </div>
</div>

---

### 🎟️ Creazione e Visualizzazione Ticket

<div style="display: flex; flex-direction: row; align-items: flex-start; margin-top: 20px;">
  <div style="flex-basis: 50%; padding-right: 20px;">
    <ul>
      <li>Creazione e visualizzazione dei ticket.</li>
      <li>Gestione dello stato del ticket: <code>open</code>, <code>in_progress</code>, <code>closed</code>.</li>
      <li>Assegnazione dei ticket da parte degli admin.</li>
    </ul>
  </div>
  <div style="flex-basis: 50%; display: flex; flex-direction: column; gap: 10px;">
    <img width="280" height="auto" alt="Schermata creazione ticket 1" src="https://github.com/user-attachments/assets/0b1bf9fb-e2a2-46de-a2e0-9cae6d93d265" style="max-width: 100%; height: auto;"/>
    <img width="280" height="auto" alt="Schermata creazione ticket 2" src="https://github.com/user-attachments/assets/39f266ac-a894-43d7-ab3f-6566e3fce3fc" style="max-width: 100%; height: auto;"/>
    <img width="280" height="auto" alt="Schermata visualizzazione ticket" src="https://github.com/user-attachments/assets/8691a394-df71-4a65-b2c4-52c1134acfe9" style="max-width: 100%; height: auto;"/>
  </div>
</div>

<p align="center">
  <img width="1405" height="343" alt="Gestione stato e assegnazione ticket" src="https://github.com/user-attachments/assets/ee9094c6-c350-41ea-9313-82de55b8177c" style="max-width: 100%; height: auto;"/>
  <img width="1405" height="343" alt="image" src="https://github.com/user-attachments/assets/a4bf915d-6f00-4143-bf19-cf0fd2a7a579" style="max-width: 100%; height: auto;" />

</p>

---

### 💬 Chat integrata e Interfaccia

<div style="display: flex; flex-direction: row; align-items: center; margin-top: 20px;">
  <div style="flex-basis: 50%;">
    <img width="1546" height="676" alt="Schermata Chat" src="https://github.com/user-attachments/assets/c2a6686e-bfbd-4b6c-9e97-c40659627cbb" style="max-width: 100%; height: auto;"/>
  </div>
  <div style="flex-basis: 50%; padding-left: 20px;">
    <ul>
      <li>Funzionalità di Chat tra utente e sviluppatore integrata su ogni ticket.</li>
      <li>Interfaccia responsive sviluppata con Quasar.</li>
    </ul>
  </div>
</div>

---


---


