import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Ticket } from 'src/ticket/ticket.entity';
@Entity()
export class Messaggio {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  descrizione: string;
  @ManyToOne(() => User, (user) => user.messaggi)
  inviatoDa: User;
  @ManyToOne(() => Ticket, (ticket) => ticket.messaggi, { onDelete: 'CASCADE' })
  ticket: Ticket;
  @CreateDateColumn()
  createdAt: Date;
}
