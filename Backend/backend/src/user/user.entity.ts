import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Messaggio } from 'src/messaggio/messaggio.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string; // E.g., "admin", "operator", "customer"

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Messaggio, (messaggio) => messaggio.inviatoDa)
  messaggi: Messaggio[];
}
