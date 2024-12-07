import { User } from 'src/user/user.entity';

export class CreateTicketDto {
  id: number;
  titolo: string;
  descrizione: string;
  stato: string;
  userId: number;
  assignedTo: User;
  createdAt: Date;
  closedAt: Date; // Può essere opzionale se vuoi che abbia un valore predefinito
  // Aggiungi altre proprietà se necessario
}
