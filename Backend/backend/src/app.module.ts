import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { TicketModule } from './ticket/ticket.module';
import { Ticket } from './ticket/ticket.entity';
import { Messaggio } from './messaggio/messaggio.entity';
import { MessaggioModule } from './messaggio/messaggio.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Formula12.',
      database: 'ticketing_db',
      entities: [User, Ticket, Messaggio],
      synchronize: true,
      logging: false,
    }),
    UserModule,
    MessaggioModule,
    AuthModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
