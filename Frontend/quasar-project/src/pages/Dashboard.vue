<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <q-page class="flex flex-center">
      <!-- Card per visualizzare i dettagli della Dashboard -->
      <q-card style="width: 100%">
        <q-card-section>
          <!-- Visualizza il nome dell'utente -->
          <div v-if="user">
            <div class="text-h6">
              Benvenuto, {{ user.nome }}!
            </div>
            <!-- Dashboard per l'amministratore -->
            <div v-if="isAdmin">
              <h2>Gestione ticket Amministratore</h2>
              <q-list bordered>
                <q-item v-for="ticket in tickets" :key="ticket.id" clickable @click="openMessages(ticket.id)">
                  <q-item-section>
                    <div><strong>Titolo:</strong> {{ ticket.titolo }}</div>
                    <div><strong>Descrizione</strong>{{ ticket.descrizione }}</div>
                    <div><strong>Nome dell'utente che ha creato il ticket e rispettivo id:</strong> {{ ticket.user?.nome + '(' + ticket.user?.id +')'|| 'Non disponibile' }}</div>
                    <div><strong>Assegnato a:</strong> {{ ticket.assignedTo?.nome }}</div>
                    <div><strong>Stato:</strong> {{ ticket.stato }}</div>
                    <q-separator />
                  </q-item-section>
                  <q-item-section>
                    <q-btn
                      v-if="ticket.stato !== 'closed'"
                       label="Gestisci"
                        color="primary"
                        @click="openManageModal(ticket)"
                      />
                       <q-badge v-else color="grey" label="Chiuso" />
                   </q-item-section>
                  <q-separator />
                </q-item>
              </q-list>
            </div>
  
            <!-- Dashboard per il cliente -->
            <div v-else>
            <h2>Dashboard Cliente</h2>
            
            <!-- Lista dei ticket aperti dal cliente -->
            <q-list bordered>
              <q-item v-for="ticket in tickets" :key="ticket.id" clickable @click="openMessages(ticket.id)">
                <q-item-section>
                  <div><strong>Titolo:</strong> {{ ticket.titolo }}</div>
                  <div><strong>Descrizione:</strong> {{ ticket.descrizione }}</div>
                  <div><strong>Stato:</strong> {{ ticket.stato }}</div>
                  <q-separator />
                </q-item-section>
              </q-item>
            </q-list>
            
            <!-- Modulo per creare un nuovo ticket -->
            <q-form @submit="openNewTicket">
              <q-input v-model="titolo" label="Titolo" filled required />
              <q-input v-model="descrizione" label="Descrizione" type="textarea" filled required />
              <q-btn label="Invia Ticket" color="primary" type="submit" class="q-mt-md" />
            </q-form>
          </div>
          
          </div>
  
          <!-- Messaggio di caricamento se l'utente non è ancora stato caricato -->
          <div v-else>
            <q-spinner color="primary" size="50px" />
            <p>Caricamento dati utente...</p>
          </div>
        </q-card-section>
      </q-card>
    </q-page>

    <q-dialog v-model="gestisciTicketAperto">
  <q-card style="min-width: 400px">
    <q-card-section>
      <div class="text-h6">Gestisci Ticket: {{ selectedTicket?.titolo }}</div>
    </q-card-section>

    <q-card-section>
      <q-select
        v-model="selectedStatus"
        :options="statusOptions.map(option => option.value)"
        label="Cambia Stato"
        filled
        required
      />

      <!-- Descrizione obbligatoria quando in_progress -->
      <q-input
        v-if="selectedStatus === 'in_progress'"
        v-model="aggiornaDescrizione"
        label="Descrizione"
        filled
        required
        :rules="[val => !!val || 'La descrizione è obbligatoria']"
      />
        <!-- Assegnato a obbligatorio quando in_progress -->
        <q-select
        v-if="selectedStatus === 'in_progress'"
        v-model="assignedTo"
        :options="adminUsers.map(admin => admin.id)"
        :option-label="option => adminUsers.find(admin => admin.id === option)?.nome || ''"
        label="Assegnato a"
        filled
        required
        :rules="[val => !!val || 'Assegnare un responsabile è obbligatorio']"
      />

    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Chiudi" color="primary" @click="closeManageModal" />
      <q-btn label="Salva" color="positive" @click="aggiornaStatoTicket" />
    </q-card-actions>
  </q-card>
</q-dialog>

  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { User } from 'src/model/User';
  import { Ticket } from 'src/model/Ticket';
  
  const user = ref<User | null>();
  const adminUsers = ref<User[]>([]); // Lista di utenti admin
  const tickets = ref<Ticket[]>([]);
  const assignedTo = ref<number | null>(null); // Salva l'ID dell'utente selezionato
  const titolo = ref<string>('');
  const descrizione = ref<string>('');
  const aggiornaDescrizione = ref <string>('');
  const router = useRouter();

const gestisciTicketAperto = ref(false);
const selectedTicket = ref<Ticket | null>(null);
const selectedStatus = ref('');
const statusOptions = [
  { label: 'Open', value: 'open' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Closed', value: 'closed' }
];


const openMessages = (ticketId: number) => {
  router.push(`/chat/${ticketId}`);
};

const CatturaAdminUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/user/admins', {
      headers: {
        Authorization: `Bearer ${token}`, // Aggiungi il token all'intestazione
      },
    });
    adminUsers.value = response.data;
    console.log('Utenti admin caricati:', adminUsers.value);
  } catch (error) {
    console.error('Errore durante il caricamento degli utenti admin:', error);
  }
};








// Aprire la modale di gestione
const openManageModal = (ticket: Ticket) => {
  selectedTicket.value = ticket;
  selectedStatus.value = ticket.stato; // Stato attuale del ticket
 gestisciTicketAperto.value = true;
};

// Chiudere la modale
const closeManageModal = () => {
  gestisciTicketAperto.value = false;
  selectedTicket.value = null;
  selectedStatus.value = '';
};

// Aggiornare lo stato del ticket
const aggiornaStatoTicket = async () => {
  if (!selectedTicket.value) return;
  if (selectedStatus.value === 'in_progress') {
    if(!assignedTo.value){
      alert('Assegnare un responsabile è obbligatorio per i ticket in lavorazione.');
      return;
    }
    
    if (!aggiornaDescrizione.value) {
      alert('La descrizione è obbligatoria per i ticket in lavorazione.');
      return;
    }
   
  }
  try {
    const token = localStorage.getItem('token'); // Recupera il token JWT
  

    console.log('test',{
  stato: selectedStatus.value,
  assignedTo: assignedTo.value, // Controlla esattamente cosa viene inviato
  aggiornaDescrizione: aggiornaDescrizione.value,
});

  const response =  await axios.put(
      `http://localhost:3000/tickets/${selectedTicket.value.id}`,
      
      
      { 
        stato: selectedStatus.value,
        assignedTo: assignedTo.value, // Invia l'ID al backend
        descrizione: aggiornaDescrizione.value,
        
       },
       
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log('Payload inviato al backend:', {
  stato: selectedStatus.value,
  assignedTo: assignedTo.value,
  descrizione: aggiornaDescrizione.value,
});

    const updatedTicket = response.data;
tickets.value = tickets.value.map(ticket =>
  ticket.id === updatedTicket.id
    ? updatedTicket
    : ticket
);
aggiornaDescrizione.value = '';

    closeManageModal();
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dello stato:', error);
  }
};

  
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token'); // Cambiato 'jwt_token' a 'token'
      if (!token) {
        console.error('No JWT token found');
        alert('Please login to continue.');
        router.push('/login');
        return;
      }
  
      const response = await axios.get('http://localhost:3000/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      user.value = response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert('Session expired. Please log in again.');
        router.push('/login');
      } else {
        console.error('Error fetching user:', error);
      }
    }
  };
  
  //recupera tickets
  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token'); // Recupera il token
      const response = await axios.get('http://localhost:3000/tickets', {
        headers: {
          Authorization: `Bearer ${token}`, // Aggiungi il token all'intestazione
        },
      });
        console.log('Dati ricevuti dal backend:', response.data);
      tickets.value = response.data;
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };
  
  const isAdmin = computed(() => user.value?.role === 'admin');
  
  const openNewTicket = async () => {
    try {
      const token = localStorage.getItem('token');
  
      // Verifica che il token e l'utente siano disponibili
      if (!token || !user.value) {
        alert('Errore: token o dati utente mancanti.');
        return;
      }
  
      // Effettua la richiesta POST al backend
      await axios.post(
        'http://localhost:3000/tickets',
        {
          titolo: titolo.value,
         descrizione: descrizione.value,
          userId: user.value.id, // Includi l'ID dell'utente autenticato
        },
        
        {
          headers: {
            Authorization: `Bearer ${token}`, // Aggiungi il token JWT all'intestazione
          },
        }
      );
      console.log('Dati inviati al backend:', {
        titolo: titolo.value,
        descrizione: descrizione.value,
        customerId: user.value.id,
      });
      // Messaggio di conferma
      alert('Ticket creato con successo!');
  
      // Aggiorna la lista dei ticket per mostrare il nuovo ticket
      await fetchTickets();
    } catch (error) {
      console.error('Errore durante la creazione del ticket:', error);
      alert('Errore durante la creazione del ticket.');
    }
  };
  
  
  onMounted(async () => {
    await fetchUser();
    await fetchTickets();
    await CatturaAdminUsers();
    
  });
  </script>
  
  <style scoped>
  /* Puoi aggiungere eventuali stili personalizzati qui */
  </style>
  