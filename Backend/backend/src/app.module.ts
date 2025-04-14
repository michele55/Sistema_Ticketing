import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

import { AuthModule } from './auth/auth.module';
//import { User } from './user/user.entity';
import { TicketModule } from './ticket/ticket.module';
//import { Ticket } from './ticket/ticket.entity';
//import { Messaggio } from './messaggio/messaggio.entity';
import { MessaggioModule } from './messaggio/messaggio.module';
import { User } from './user/user.entity';
import { Ticket } from './ticket/ticket.entity';
import { Messaggio } from './messaggio/messaggio.entity';
import { Repository } from 'typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'accesso',
      database: 'ticketing_db',
      entities: [User, Ticket, Messaggio], // Percorso delle entità
      synchronize: true, // Disabilita sincronizzazione automatica
    }),
    UserModule,
    MessaggioModule,
    AuthModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Messaggio)
    private readonly messaggioRepository: Repository<Messaggio>,
  ) {}

  async onApplicationBootstrap() {
    console.log('Eseguendo il popolamento del database...');

    try {
      // Cancellazione dei dati in Messaggio e Ticket, mantenendo User
      await this.messaggioRepository.delete({}); // Cancella tutti i messaggi
      await this.ticketRepository.delete({}); // Cancella tutti i ticket
      console.log('I dati di Messaggio e Ticket sono stati cancellati');
    } catch (error) {
      console.error('Errore durante la cancellazione dei dati:', error);
    }

    try {
      // Popolamento utenti
      const existingAdmin = await this.userRepository.findOneBy({
        email: 'admin@example.com',
      });
      const existingDeveloper = await this.userRepository.findOneBy({
        email: 'developer@example.com',
      });
      const existingCustomer = await this.userRepository.findOneBy({
        email: 'customer@example.com',
      });
      if (!existingAdmin) {
        const adminUser = this.userRepository.create({
          nome: 'Admin',
          email: 'admin@example.com',
          password:
            '$2a$12$yLR1Ra1oLYiYEuRTYsWZd.qpnBHm6N6I5oGyMv.t6Ax3bT4W2ZClW',
          role: 'admin',
        });
        await this.userRepository.save(adminUser);
      }
      if (!existingDeveloper) {
        const DeveloperUser = this.userRepository.create({
          nome: 'Developer',
          email: 'developer@example.com',
          password:
            '$2a$12$yLR1Ra1oLYiYEuRTYsWZd.qpnBHm6N6I5oGyMv.t6Ax3bT4W2ZClW',
          role: 'sviluppatore',
        });
        await this.userRepository.save(DeveloperUser);
      }
      if (!existingCustomer) {
        const customerUser = this.userRepository.create({
          nome: 'Customer',
          email: 'customer@example.com',
          password:
            '$2a$12$yLR1Ra1oLYiYEuRTYsWZd.qpnBHm6N6I5oGyMv.t6Ax3bT4W2ZClW',
          role: 'customer',
        });
        await this.userRepository.save(customerUser);
      } else {
        console.log('I dati sono già stati popolati.');
      }
    } catch (error) {
      console.error('Errore durante il popolamento:', error);
    }
  }
}
