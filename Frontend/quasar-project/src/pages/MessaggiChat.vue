<template>
  <q-page class="q-pa-md">
    <div class="chat-container">
      <q-card class="chat-box">
        <q-card-section>
          <h3>Chat</h3>
        </q-card-section>

        <!-- Lista messaggi usando ChatMessage 
        <q-card-section class="messages">
          <q-chat-message
          
           v-for="message in messages"
            :key="message.id"
            :text="[message.content]"
            :sent="message.isAdmin"
            :name="message.isAdmin ? 'Amministratore' : 'Utente'"
            :avatar="message.isAdmin ? 'https://cdn.quasar.dev/img/avatar.png' : 'https://cdn.quasar.dev/img/avatar2.jpg'"
            :stamp="formatTimestamp(message.createdAt)"
          />
        </q-card-section>-->

        <!-- Input per inviare messaggi 
         <q-card-section>
          <div class="message-input">
            <q-input
              v-model="newMessage"
              placeholder="Scrivi un messaggio..."
              outlined
              dense
              @keyup.enter=""
            />
            <q-btn
              icon="send"
              color="primary"
              dense
              @click="sendMessage"
              :disable="!newMessage.trim()"
            />
          </div>
        </q-card-section>-->
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {  onMounted } from 'vue';



//const newMessage = ref<string>('');

// Simula l'invio di un messaggio


// Formatta timestamp
/*
function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString();
}*/

// Simula il caricamento iniziale dei messaggi
onMounted(() => {
  console.log('Chat caricata con messaggi mock');
});
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
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 10px;
}

.message-input {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
