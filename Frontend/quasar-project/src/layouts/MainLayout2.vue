<template>
    <q-layout view="lHh Lpr lFf">
      <!-- Barra Intestazione -->
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title>Sistema di Gestione Ticket</q-toolbar-title>
        </q-toolbar>
      </q-header>
  
      <!-- Contenuto Principale -->
      <q-page-container>
        <router-view />  <!-- Mostra il contenuto della pagina di login -->
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  defineOptions({
    name: 'MainLayout2',
  });
  </script>
  