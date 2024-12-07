import { User } from './User';


export interface Ticket {
    id: number;
    titolo: string;
    descrizione: string;
    stato: string; // "open", "in progress", "closed", etc.
    user: User; // Oggetto con le informazioni del cliente
    assignedTo: User | null; // Oggetto con le informazioni dell'operatore, può essere null
    createdAt: Date;
    updatedAt: Date;
    closedAt: Date | null; // Può essere null se il ticket non è chiuso
  }
  