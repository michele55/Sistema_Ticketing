import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // Layout dedicato alla Pagina di Login
  {
    path: '/',
    component: () => import('layouts/MainLayout2.vue'), // Layout per il login
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
    ],
  },

  // Layout dedicato alle Pagine Autenticate
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'), // Layout per le pagine protette
    children: [
      { path: 'dashboard', name: 'Dashboard', component: () => import('pages/Dashboard.vue') },
      { path: 'chat/:ticketId', name: 'Chat', component: () => import('pages/MessaggiChat.vue') },
    ],
  },

  // Pagina di Errore
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
