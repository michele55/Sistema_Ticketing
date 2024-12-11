<template>
  <q-page class="q-pa-md">
    <div class="chat-container">
      <q-card class="chat-box">
        <q-card-section>
          <h3>Chat</h3>
        </q-card-section>

        <!-- Lista messaggi -->
        <q-card-section class="messages" v-if="messaggi.length">
          <q-chat-message
            v-for="messaggio in messaggi"
            :key="messaggio.id"
            :text="[messaggio.descrizione]"
            :sent="messaggio.inviatoDa.id === currentUserId"
            :name="messaggio.inviatoDa.id === currentUserId ? 'Tu' : messaggio.inviatoDa.nome"
            :avatar="messaggio.inviatoDa.id === currentUserId 
              ? 'https://cdn.quasar.dev/img/avatar2.jpg' 
              : 'https://cdn.quasar.dev/img/avatar.png'"
            :stamp="formatTimestamp(messaggio.createdAt)"
          />
        </q-card-section>

        <q-card-section v-else>
          <p class="text-grey">Nessun messaggio trovato.</p>
        </q-card-section>

        <!-- Input per inviare messaggi -->
        <q-card-section>
          <div class="message-input">
            <q-input
              v-model="newMessage"
              placeholder="Scrivi un messaggio..."
              outlined
              dense
              @keyup.enter="sendMessage"
            />
            <q-btn
              icon="send"
              color="primary"
              dense
              @click="sendMessage"
              :disable="!newMessage.trim()"
            />
          </div>
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

// Stato locale
const route = useRoute();
const ticketId = route.params.ticketId; // ID del ticket corrente

// ID dell'utente autenticato, simulato dal token JWT
const currentUserId = ref<number | null>(null);
const messaggi = ref<{ id: number; descrizione: string; createdAt: string; inviatoDa: User }[]>([]);
const newMessage = ref<string>('');

// Recupera l'ID utente corrente dal token JWT
function getCurrentUserId() {
  const token = localStorage.getItem('token');
  if (!token) return;

  const payload = JSON.parse(atob(token.split('.')[1]));
  currentUserId.value = payload.sub; // Assumi che `userId` sia presente nel payload del token JWT
}

// Recupera i messaggi dal backend
async function fetchMessages() {
  try {
    const token = localStorage.getItem('token');
if (!token) {
  console.error('Token JWT mancante!');
  return;
}
    const response = await axios.get(`http://localhost:3000/message/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    messaggi.value = response.data;
  } catch (error) {
    console.error('Errore durante il recupero dei messaggi:', error);
  }
}

// Invia un nuovo messaggio al backend
async function sendMessage() {
  if (!newMessage.value.trim()) return;

  try {
    const response = await axios.post(
      `http://localhost:3000/message/${ticketId}`,
      {
        descrizione: newMessage.value,   // Campo corretto
        userId: currentUserId.value, 
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    messaggi.value.push(response.data); // Aggiunge il messaggio inviato
    newMessage.value = ''; // Resetta l'input
  } catch (error) {
    console.error("Errore durante l'invio del messaggio:", error);
  }
}

// Carica i dati al montaggio del componente
onMounted(() => {
  getCurrentUserId();
  fetchMessages();
});

// Funzione per formattare il timestamp
function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString();
}
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
}

.chat-box {
  display: flex;
  flex-direction: column;
  height: 70vh;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.message-input {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
