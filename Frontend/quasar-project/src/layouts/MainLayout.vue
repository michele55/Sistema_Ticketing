<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Sistema di Gestione ticket
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
     <!-- Drawer (Menu Laterale) -->
     <q-drawer v-model="leftDrawerOpen">
      <q-list>
        <!-- Pulsante Logout -->
        <q-item clickable v-ripple @click="logout">
          <q-btn
          flat
          dense
          icon="logout"
          label="Logout"
          to="/"
        />
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';



defineOptions({
  name: 'MainLayout'
});



const leftDrawerOpen = ref(false);

function logout() {
  // Rimuovi il token dal localStorage
  localStorage.removeItem('token');
 
}

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
