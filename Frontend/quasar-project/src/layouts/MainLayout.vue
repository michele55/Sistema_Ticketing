<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
      
        <q-toolbar-title>Sistema di Gestione Ticket</q-toolbar-title>

        <!-- Bottone Dashboard Visibile Solo se Autenticato -->
        <q-btn
          v-if="isAuthenticated"
          flat
          dense
          icon="home"
          label="Dashboard"
          class="q-ml-md"
          @click="navigateToDashboard"
        />

        <!-- Bottone di Logout -->
        <q-btn
          v-if="isAuthenticated"
          flat
          dense
          icon="logout"
          label="Logout"
          class="q-ml-md"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>





<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isAuthenticated = ref(false);

// Funzione per Verificare il Token JWT
function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now(); // Verifica la scadenza
  } catch (error) {
    console.error('Token non valido:', error);
    return false;
  }
}

// Controllo Automatico all'Avvio
onMounted(() => {
  isAuthenticated.value = checkAuth(); 
});

// Funzione di Logout
function logout() {
  localStorage.removeItem('token');
  isAuthenticated.value = false; // Aggiorna lo stato
  router.push('/'); // Torna alla pagina di login
}

// Navigazione alla Dashboard
function navigateToDashboard() {
  if (isAuthenticated.value) {
    router.push('/dashboard');
  } else {
    alert('Sessione scaduta! Effettua nuovamente il login.');
    router.push('/');
  }
}
</script>
