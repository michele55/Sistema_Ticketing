import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
      { path: 'dashboard', name: 'Dashboard', component: ()=> import ('pages/Dashboard.vue')},
    ],
  },
 
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
