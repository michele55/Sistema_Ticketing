<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page class="dashboard-page q-py-md">
    <q-card style="width: 100%">
      <q-card-section>
        <template v-if="user">
          <div class="text-h5 q-mb-md">Benvenuto, {{ user.nome }}!</div>
          <!-- Tabs di Navigazione -->
          <q-tabs 
            v-model="currentTab" 
            dense align="left" 
            active-color="primary" 
            indicator-color="primary">
            <q-tab name="tickets_aperti" icon="article" label="Ticket Aperti" />
            <q-tab name="tickets_chiusi" icon="archive" label="Ticket Chiusi" />
            <q-tab v-if="!isAdmin && !Sviluppatore" name="nuovo_ticket" icon="add" label="Nuovo Ticket" />
          </q-tabs>
          <q-tab-panels v-model="currentTab" animated>
            <!-- Pannello Ticket Aperti -->
            <q-tab-panel  name="tickets_aperti">
              <div class="row items-center justify-between q-mb-md">
              <h2 class="text-h6">Ticket Aperti</h2>
            <!-- Filtro per Stato -->
            <q-select
              v-model="selectedFilter"
              :options="statusOptions2.map(option => option.value)"
              label="Filtra per stato"
              outlined
              dense
              clearable
              class="filter-select"
            />
          </div>
              <q-list v-if="(selectedFilter ? filteredTicketsAperti.length : ticketsAperti.length) > 0" bordered class="ticket-list" padding>
                <q-item  v-for="ticket in (selectedFilter ? filteredTicketsAperti : ticketsAperti)" :key="ticket.id" class="ticket-item"  v-ripple>
                  <q-item-section>

                    <q-item-label>
                      <span class="text-bold">Titolo:</span> {{ ticket.titolo }}
                    </q-item-label>

                    <q-item-label>
                      <span class="text-bold">   Descrizione:</span> {{ ticket.descrizione }}</q-item-label>
                    <q-item-label>
                      <span class="text-bold">  Stato: </span>
                      <q-badge 
                        :color=" getTicketStatusColor(ticket.stato)" 
                        :label="ticket.stato.toUpperCase()" 
                      />
                    </q-item-label>
                     <!-- Testo Centrale Assegnato A -->
                <q-item-label v-if="ticket.stato === 'in_progress'">
                  <span class="text-bold">  Assegnato a: </span> {{ticket.assignedTo?.nome}}</q-item-label>
                  </q-item-section>
                  
                  <q-item-section side top>
                    <div class="row items-center q-gutter-sm">
                    <!-- Bottone Apri dettagli (Cliente) -->
                    <q-btn 
                      icon="chat" 
                      label="Apri dettagli ticket" 
                      color="secondary" 
                      v-if="!isAdmin" 
                      @click="openMessages(ticket.id)" 
                    />
                    
                    <!-- Bottone Gestisci (Admin) -->
                    <q-btn 
                      icon="manage_accounts" 
                      label="Gestisci" 
                      color="primary" 
                      v-if="isAdmin && ticket.stato !== 'closed'" 
                      @click="openManageModal(ticket)" 
                    />
                    <q-btn
                    v-if="Sviluppatore && ticket.stato !== 'closed'"
                      label="Chiudi Ticket"
                      color="negative"
                      icon="cancel"
                        @click="chiudiTicket(ticket.id)"
                    />
                    <q-btn 
                      icon="chat" 
                      label="Apri Chat" 
                        class="q-ml-sm"
                      color="primary" 
                      v-if="isAdmin && ticket.stato !== 'closed'" 
                      @click="openMessages(ticket.id)" 
                    />
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
              <div v-else class="q-pa-md text-center text-grey-7">
              <q-icon name="info" size="md" class="q-mr-sm" />
                 Nessun ticket aperto al momento.
              </div>
            </q-tab-panel>

            <!-- Pannello Ticket Chiusi -->
            <q-tab-panel name="tickets_chiusi">
              <h2 class="text-h6">Ticket Chiusi</h2>
              <q-list v-if="ticketsChiusi != null && ticketsChiusi.length > 0" bordered padding>
                <q-item v-for="ticket in ticketsChiusi" :key="ticket.id"  class="ticket-item q-pa-md"  v-ripple>
               
                  <q-item-section>
                
                    <q-item-label class="text-bold">Titolo: {{ ticket.titolo }}</q-item-label>
                    <q-item-label>Descrizione: {{ ticket.descrizione }}</q-item-label>
                    <q-item-label>  Assegnato a: {{ ticket.assignedTo?.nome ? ticket.assignedTo.nome : "Non assegnato" }}</q-item-label>
                    
                    <q-item-label>
                      Stato:
                      <q-badge color="grey" label="CHIUSO" />
                    </q-item-label>
                    <q-item-label>
          <q-badge color="primary" label="Mostra Info su utente che ha creato ticket" class="q-ml-sm">
            <q-tooltip
              @show="fetchAssignedUser(ticket.id)"  
              transition-show="fade"
              transition-hide="fade"
              class="tooltip-custom"
            >
              <div v-if="assignedUser">
                <p><b>Nome:</b> {{ assignedUser?.nome || "Non assegnato" }}</p>
                <p><b>Email:</b> {{ assignedUser?.email || "Non disponibile" }}</p>
               
              </div>
              <div v-else>
                Caricamento...
              </div>
            </q-tooltip>
          </q-badge>
        </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <div v-else class="q-pa-md text-center text-grey-7">
              <q-icon name="info" size="md" class="q-mr-sm" />
                 Nessun ticket chiuso al momento.
              </div>
            </q-tab-panel>

            <!-- Pannello Nuovo Ticket -->
            <q-tab-panel v-if="!isAdmin && !Sviluppatore" name="nuovo_ticket">
              <h2 class="text-h6">Crea Nuovo Ticket</h2>
              <q-card flat bordered>
                <q-card-section>
                  <q-form @submit="openNewTicket">
                    <q-input v-model="titolo" label="Titolo" filled required />
                    <q-input v-model="descrizione" label="Descrizione" type="textarea" filled required />
                    <q-btn label="Invia" color="primary" type="submit" class="q-mt-md" />
                  </q-form>
                </q-card-section>
              </q-card>
            </q-tab-panel>
          </q-tab-panels>
        </template>

        <!-- Modale Gestione Ticket -->
        <q-dialog v-model="gestisciTicketAperto">
          <q-card style="min-width: 400px">
            <q-card-section>
              <div class="text-h6">Gestisci Ticket: {{ selectedTicket?.titolo }}</div>
            </q-card-section>
            <q-card-section>
              <!-- Uso di statusOptions -->
              <q-select
                v-model="selectedStatus"
                :options="statusOptions.map(option => option.value)"
                label="Cambia Stato"
                filled
                required
              />
              <!-- Descrizione Obbligatoria -->
              <q-input
                v-if="selectedStatus === 'in_progress'"
                v-model="aggiornaDescrizione"
                label="Descrizione"
                filled
                required
                :rules="[val => !!val || 'La descrizione è obbligatoria']"
              />
              <!-- Assegnato a Obbligatorio -->
              <q-select
                v-if="selectedStatus === 'in_progress'"
                v-model="assignedTo"
                :options="developerUsers.map(developer => developer.id)"
                :option-label="option => developerUsers.find(developer => developer.id === option)?.nome || ''"
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

        <template v-if="!user">
        <q-spinner color="primary" size="50px" />
        <p>Caricamento dati utente...</p>
      </template>

      </q-card-section>
    </q-card>
  </q-page>
</template>

  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { User } from 'src/model/User';
  import { Ticket } from 'src/model/Ticket';
 
  
  const user = ref<User | null>();
  const adminUsers = ref<User[]>([]); // Lista di utenti admin
  const developerUsers = ref<User[]>([]); // Lista di utenti developer
 
  const tickets = ref<Ticket[]>([]);
  const assignedTo = ref<number | null>(null); // Salva l'ID dell'utente selezionato
  const titolo = ref<string>('');
  const descrizione = ref<string>('');
  const aggiornaDescrizione = ref <string>('');
  const router = useRouter();
  const currentTab = ref('tickets_aperti');
  const gestisciTicketAperto = ref(false);
  const selectedTicket = ref<Ticket | null>(null);
  const selectedStatus = ref('');
  const messaggi = ref<{ id: number; descrizione: string; createdAt: string; inviatoDa: User }[]>([]);
 

  const statusOptions = [
  { label: 'Open', value: 'open' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Closed', value: 'closed' }
];

const statusOptions2 = [
  { label: 'Open', value: 'open' },
  { label: 'In Progress', value: 'in_progress' }
];
  const Sviluppatore = computed(() => user.value?.role === 'sviluppatore');
  const isAdmin = computed(() => user.value?.role === 'admin');
  const customer= computed(() => user.value?.role === 'customer');

  const selectedFilter = ref<string | null>(null);
  const filteredTicketsAperti = computed(() => {
  if (!selectedFilter.value) {
    return tickets.value;
  }
  return tickets.value.filter(ticket => ticket.stato === selectedFilter.value);
});




  function getTicketStatusColor(status: string): string {
  switch (status) {
    case 'closed':
      return 'grey';
    case 'in_progress':
      return 'orange';
    case 'open':
      return 'green';
    default:
      return 'blue';
  }
}


  const ticketsAperti = computed(() => {
  if (isAdmin.value) {
    // Admin vede tutti i ticket aperti
    return tickets.value.filter(ticket => ticket.stato !== 'closed');
  } else if (Sviluppatore.value) {
    // Sviluppatore vede solo i ticket assegnati a lui
    return tickets.value.filter(
      ticket => ticket.stato !== 'closed' && ticket.assignedTo?.id === user.value?.id
    );
  } else if (customer.value) {
    // Cliente vede solo i ticket creati da lui
    return tickets.value.filter(
      ticket => ticket.stato !== 'closed' && ticket.user?.id === user.value?.id
    );
  }
  return []; // Caso predefinito per sicurezza
});

const ticketsChiusi = computed(() => {
  if (isAdmin.value) {
    // Admin vede tutti i ticket chiusi
    return tickets.value.filter(ticket => ticket.stato === 'closed');
  } else if (Sviluppatore.value) {
    // Sviluppatore vede solo i ticket chiusi a lui assegnati
    return tickets.value.filter(
      ticket => ticket.stato === 'closed' && ticket.assignedTo?.id === user.value?.id
    );
  } else if (customer.value) {
    // Cliente vede solo i ticket chiusi creati da lui
    return tickets.value.filter(
      ticket => ticket.stato === 'closed' && ticket.user?.id === user.value?.id
    );
  }
  return []; // Caso predefinito per sicurezza
});

const chiudiTicket = async (ticketId: number) => {
  if (!selectedTicket.value) console.error('Nessun ticket selezionato'); // Assicurati che un ticket sia selezionato

  try {
    const token = localStorage.getItem('token');
    await axios.put(
      `http://localhost:3000/tickets/${ticketId}`,
      { stato: 'closed' }, // Aggiorna lo stato
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Aggiorna la lista dei ticket
    await fetchTickets(); 
  } catch (error) {
    console.error('Errore durante la chiusura del ticket:', error);
  }
};


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


const CatturaDeveloperUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/user/sviluppatore', {
      headers: {
        Authorization: `Bearer ${token}`, // Aggiungi il token all'intestazione
      },
    });
    developerUsers.value = response.data;
    console.log('Utenti developer caricati:', developerUsers.value);
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
       },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (aggiornaDescrizione.value.trim()) {
      const response = await axios.post(
        `http://localhost:3000/message/${selectedTicket.value.id}`,
        {
          descrizione: aggiornaDescrizione.value,
          userId: user.value?.id, // Utente autenticato dal token JWT
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      // Aggiorna i messaggi nella chat
      messaggi.value.push(response.data);
      aggiornaDescrizione.value = ''; // Resetta il campo di input
    }
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

  //recupera utente
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
  
  
 
  //funzionalità che apre nuovo ticket
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
  
  const assignedUser = ref<User | null>(null);

async function fetchAssignedUser(ticketId: number) {
  try {
    const token = localStorage.getItem('token');
    if (!token || !ticketId) {
      console.error('Token JWT o ID Ticket mancanti!');
      return;
    }

    const response = await axios.get(`http://localhost:3000/tickets/${ticketId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Assegna l'intero oggetto utente
    assignedUser.value = response.data.user;

    console.log("Dati dell'utente assegnato:", assignedUser.value);
  } catch (error) {
    console.error("Errore durante il recupero dell'utente assegnato:", error);
  }
}
  
  onMounted(async () => {
    await fetchUser();
    await fetchTickets();
  
    await CatturaAdminUsers();
    await CatturaDeveloperUsers();
    
  });
  </script>
  
  <style scoped>
/* Sfondo generale */
.q-page {
  background: #f4f4f9;
  padding: 20px;
}

/* Lista dei ticket */
.ticket-list {
  background: #c7e2e471;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
}

/* Elementi dei ticket */
.ticket-item {
  background: #f9f9ff;         /* Sfondo distinto */
  border: 1px solid #0295f7e1;   /* Linea di separazione */
  margin-bottom: 8px;          /* Margine inferiore */
  padding: 10px;
  border-radius: 8px;          /* Angoli arrotondati */
  transition: all 0.3s ease;   /* Animazione */
}

/* Rimozione della linea per l'ultimo elemento */
.ticket-item:last-child {
  margin-bottom: 0;
}

/* Effetto Hover */
.ticket-item:hover {
  background: #a9bfe45b;
  border-color: #16be32;
  transform: translateY(-2px); /* Leggero sollevamento */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Testi migliorati */
.text-primary {
  color: #1976d2;
}

.text-info {
  color: #0288d1;
}

.text-bold {
  font-weight: bold;
}

.q-badge {
  font-size: 0.8rem;
}

.q-item-label {
  font-size: 1rem;
}

.filter-select {
  width: 200px; /* Dimensione personalizzata */
  margin-left: 20px; /* Distanza dal titolo */
}
.tooltip-custom {
  font-size: 80px;   /* Dimensione del testo */
  font-weight: lighter; /* Testo in grassetto */
  line-height: 1;  /* Spaziatura tra righe */
}
</style>
