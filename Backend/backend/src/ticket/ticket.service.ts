import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { User } from 'src/user/user.entity';
import { CreateTicketDto } from './create-ticket-dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Repository per l'entità User
  ) {}

  // Metodo per creare un ticket
  async create(ticketData: CreateTicketDto): Promise<Ticket> {
    const newTicket = this.ticketRepository.create({
      titolo: ticketData.titolo,
      descrizione: ticketData.descrizione,
      stato: ticketData.stato || 'open', // Stato predefinito
      user: { id: ticketData.userId }, // Relazione con l'utente tramite l'ID
    });
    console.log('Nuovo ticket creato:', newTicket);
    return this.ticketRepository.save(newTicket);
  }

  // Metodo per ottenere tutti i ticket
  async findAll(user: any): Promise<Ticket[]> {
    if (user.role === 'admin') {
      // Carica tutti i ticket con le relazioni
      return this.ticketRepository.find({
        relations: ['user', 'assignedTo'], // Includi i dati dell'utente associato
      });
    } else {
      // Carica solo i ticket dell'utente specifico con le relazioni
      return this.ticketRepository.find({
        where: { user: { id: user.id } },
        relations: ['user', 'assignedTo'], // Includi i dati dell'utente associato
      });
    }
  }
  // Metodo per ottenere un ticket per ID
  async findOne(id: number): Promise<Ticket> {
    return this.ticketRepository.findOne({ where: { id } });
  }
  async aggiornaStato(
    id: number,
    stato: string,
    assignedTo?: number,
    descrizione?: string,
  ): Promise<Ticket> {
    // Trova il ticket da aggiornare
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['assignedTo', 'user'],
    }); // Includi la relazione assignedTo

    if (!ticket) {
      throw new Error('Ticket non trovato');
    }

    // Aggiorna lo stato
    ticket.stato = stato;
    console.log('Stato aggiornato:', ticket.stato);
    console.log('Descrizione nuova:', descrizione);

    // Gestisci la data di chiusura
    if (stato === 'closed') {
      ticket.closedAt = new Date();
    } else {
      ticket.closedAt = null; // Reset se lo stato cambia di nuovo
    }

    // Aggiorna l'assegnatario se fornito
    if (assignedTo) {
      const user = await this.userRepository.findOne({
        where: { id: assignedTo },
      }); // Trova l'utente per ID
      if (!user) {
        throw new Error('Utente assegnato non trovato');
      }
      ticket.assignedTo = user; // Aggiorna la relazione con l'utente
      console.log('Assegnato a:', user.nome);
    }
    if (descrizione) {
      ticket.descrizione = descrizione; // Aggiorna la descrizione
      console.log('Descrizione nuova dopo aggiornamento:', ticket.descrizione);
    }
    // Salva le modifiche
    return this.ticketRepository.save(ticket);
  }
}
