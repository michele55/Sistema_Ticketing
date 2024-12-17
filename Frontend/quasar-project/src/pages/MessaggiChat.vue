<template>
  <q-page class="q-pa-md chat-page">
    <div class="chat-container">
      <!-- Riquadro a Sinistra: Dati Utente -->
      <q-card class="user-details" flat bordered>
        <q-card-section>
          <h4>Dati Utente che ha creato il ticket</h4>
          <q-item>
            <q-avatar icon="person" size="100px" />
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">Nome:</q-item-label>
              <q-item-label>{{ ticketOwner?.nome }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">Email:</q-item-label>
              <q-item-label>{{ ticketOwner?.email}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">Ruolo:</q-item-label>
              <q-item-label>{{ ticketOwner?.role}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">Data Creazione Account:</q-item-label>
              <q-item-label>{{ ticketOwner?.createdAt}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
          <q-item-section>
            <q-item-label class="text-bold">Stato Ticket:</q-item-label>
            <q-item-label>
              <q-badge 
                        :color="getTicketStatusColor(ticketStatus)" 
                        :label="ticketStatus.toUpperCase()" 
                      />
            </q-item-label>
          </q-item-section>
        </q-item>
        </q-card-section>
      </q-card>

      <!-- Riquadro a Destra: Chat -->
      <q-card class="chat-box" flat bordered>
        <q-card-section>
          <h3>Chat</h3>
        </q-card-section>

        <q-card-section class="messages" v-if="messaggi.length">
          <q-chat-message
            v-for="messaggio in messaggi"
            :key="messaggio.id"
            :text="[messaggio.descrizione]"
            :sent="messaggio.inviatoDa.id === currentUserId"
            :name="messaggio.inviatoDa.id === currentUserId ? 'Tu' : messaggio.inviatoDa.nome"
            :avatar="messaggio.inviatoDa.id === currentUserId 
              ? 'https://ui-avatars.com/api/?name='+  messaggio.inviatoDa.nome +'&background=random' 
              : 'https://ui-avatars.com/api/?name='+  ticketOwner?.nome +'&background=random'"
            :stamp="formatTimestamp(messaggio.createdAt)"
          />
        </q-card-section>

        <q-card-section v-else>
          <p class="text-grey">Nessun messaggio trovato.</p>
        </q-card-section>

        <q-card-section class="message-input full-width">
        <q-input
          v-model="newMessage"
          placeholder="Scrivi un messaggio..."
          outlined
          dense
          class="full-width"
          @keyup.enter="sendMessage"
        />
          <q-btn
            icon="send"
            color="primary"
            dense
            @click="sendMessage"
            :disable="!newMessage.trim()"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { User } from 'src/model/User';

const route = useRoute();
const ticketId = route.params.ticketId;
const ticketStatus = ref<string>('');
// Stato Utente
const currentUser = ref<User | null>(null);
  const currentUserId = ref<number | null>(null);
   const  ticketOwner = ref<User | null>(null);
const messaggi = ref<{ id: number; descrizione: string; createdAt: string; inviatoDa: User }[]>([]);
const newMessage = ref<string>('');

// Stato Messaggi

function getTicketStatusColor(status: string): string {
  switch (status) {
    case 'closed':
      return 'grey';
    case 'in_progress':
      return 'orange';
    case 'open':
      return 'green';
    default:
      return 'blue';
  }
}


/*function getCurrentUserId() {
  const token = localStorage.getItem('token');
  if (!token) return;

  const payload = JSON.parse(atob(token.split('.')[1]));
  currentUserId.value = payload.sub; // Assumi che `userId` sia presente nel payload del token JWT
}*/
// Recupera i dati utente dal token JWT
// Recupera i dati del creatore del ticket usando findOne
async function fetchTicketOwner() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:3000/tickets/${ticketId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    ticketOwner.value = response.data.user;
    ticketStatus.value = response.data.stato;
  } catch (error) {
    console.error('Errore durante il recupero dei dati del creatore del ticket:', error);
  }
}



function getCurrentUser() {
  const token = localStorage.getItem('token');
  if (!token) return;

  const payload = JSON.parse(atob(token.split('.')[1]));
  currentUserId.value = payload.sub;
  currentUser.value = {
    id: payload.sub,
    nome: payload.name,
    email: payload.email,
    password: '',
    role: payload.role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

// Recupera i messaggi dal backend
async function fetchMessages() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:3000/message/${ticketId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    messaggi.value = response.data;
  } catch (error) {
    console.error('Errore durante il recupero dei messaggi:', error);
  }
}

// Invia un nuovo messaggio
async function sendMessage() {
  if (!newMessage.value.trim()) return;

  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `http://localhost:3000/message/${ticketId}`,
      {
        descrizione: newMessage.value,
        userId: currentUserId.value,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    messaggi.value.push(response.data);
    newMessage.value = '';
  } catch (error) {
    console.error("Errore durante l'invio del messaggio:", error);
  }
}

function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString();
}

onMounted(() => {
  getCurrentUser();
  fetchTicketOwner();
  fetchMessages();
});
</script>

<style scoped>
/* Miglioramenti Generali */
.chat-page {
  background-color: #c7e2e471;
  min-height: 100vh; /* Cambiato da height */
}

.chat-container {
  border-color: aqua;
  border-radius: 20px;
  display: flex;
  width: 100%;
  max-width: 1200px;
  min-height: calc(100vh - 40px);
  margin: 20px auto; /* Centratura migliorata */
  gap: 20px;
}

/* Stile Dettagli Utente */
.user-details {
  border-radius: 15px;
  border-color: #2196f3;
  min-width: 280px;
  max-width: 320px;
  padding: 20px;
  flex-shrink: 0;
}

.user-details h4 {
  text-align: center;
  margin-bottom: 15px;
  color: #333;
}

/* Stile della Chat */
.chat-box {
  border-radius: 15px;
  border-color: #2196f3;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Aggiunto */
}

/* Stile Messaggi */
.messages {
 
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  background: #f9f9f9; /* Aggiunto per separare l'area messaggi */
}

/* Input dei messaggi */
.message-input {
  display: flex;
  gap: 10px;
  margin-top: auto;
  align-items: center;
  width: 100%; 
}

.q-input.full-width {
  flex-grow: 1; /* Estensione completa */
}

/* Stile Pulsante Invia */
.message-input > q-btn {
  padding: 10px;
  border-radius: 8px;
}

/* Stile Etichette Testo */
.text-bold {
  font-weight: bold;
}

.text-grey {
  font-size: 16px;
  color: #6c757d; /* Colore più leggibile */
}

/* Personalizzazione Avatar */
q-avatar {
  border: 2px solid #2196f3;
}

</style>
