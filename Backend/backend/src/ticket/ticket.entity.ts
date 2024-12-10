import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Messaggio } from 'src/messaggio/messaggio.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titolo: string;

  @Column('text')
  descrizione: string;

  @Column({ default: 'open' })
  stato: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' }) // Specifica che questa relazione usa la colonna "customerId"
  user: User; // Relazione con l'utente

  @ManyToOne(() => User, { nullable: true })
  assignedTo: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  closedAt: Date;

  @OneToMany(() => Messaggio, (messaggio) => messaggio.ticket)
  messaggi: Messaggio[];
}
