import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // ✅ AGGIUNGI QUESTA GUARDIA
  Router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const publicRoutes = ['/login'];

    if (!token && !publicRoutes.includes(to.path)) {
      // Utente non autenticato e rotta privata → redirect a login
      next('/login');
    } else {
      next(); // Tutto ok
    }
  });

  return Router;
});
