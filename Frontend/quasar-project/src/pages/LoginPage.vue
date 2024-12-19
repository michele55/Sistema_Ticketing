<template>
    <q-page  :style="backgroundStyle" class="login-page">
      <q-card style="width: 400px" class="login-card">
        <q-card-section>
          <div class="text-h6">Login</div>
          <q-form @submit="onLogin">
            <q-input
              v-model="form.email"
              label="Email"
              name="Email"
              type="email"
              outlined
              :rules="[val => !!val || 'Email required']"
            />
            <q-input
              v-model="form.password"
              label="Password"
              type="password"
              name="Password"
              outlined
              :rules="[val => !!val || 'Password required']"
            />
            <q-btn
              label="Login"
              type="submit"
              color="primary"
              class="q-mt-md"
              :loading="loading"
            />
          </q-form>
        </q-card-section>
        
      </q-card>
    </q-page>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';

import minimalist_background_no_elements from 'src/assets/minimalist_background_no_elements.jpeg'
  interface FormData {
    email: string;
    password: string;
  }
  
  const form = ref<FormData>({
    email: '',
    password: ''
  });
  
  const loading = ref(false);
  const router = useRouter();
  
  const onLogin = async() => {
    loading.value = true;
    // Logica di autenticazione
    try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      email: form.value.email,
      password: form.value.password
    });
       // Salva il token JWT nel localStorage
       const token = response.data.access_token;
    localStorage.setItem('token', token);

    // Configura Axios per usare il token nelle richieste successiv
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Reindirizza alla dashboard
    router.push('/Dashboard');
    // Gestisci la risposta (ad esempio, salva il token o reindirizza)
 
    console.log('Login riuscito, token:', token);

    // Reindirizza dopo il login (esempio)
   
  } catch (error: unknown) {
    // Verifica che l'errore sia un'istanza di un errore HTTP di axios
    if (axios.isAxiosError(error) && error.response) {
      // Ora TypeScript sa che 'error' è un errore Axios
      if (error.response.status === 401) {
        alert('Credenziali errate');
      } else {
        alert('Errore durante il login');
      }
    } else {
      // Gestisci altri tipi di errore (non axios, ad esempio problemi di rete)
      alert('Si è verificato un errore imprevisto');
    }
  } finally {
    loading.value = false;
  }
  };
  

  const backgroundStyle = {
  backgroundImage: `url(${minimalist_background_no_elements})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '90vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
  </script>

  <style scoped>



.login-card {
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.8); /* Sfondo semitrasparente */
  border-radius: 12px;
  margin-left: 75px;
}




</style>