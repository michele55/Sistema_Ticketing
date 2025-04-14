import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messaggio } from './messaggio.entity';
import { MessaggioService } from './messaggio.service';
import { MessageController } from './messaggio.controller';
import { Ticket } from 'src/ticket/ticket.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Messaggio, Ticket, User])],
  providers: [MessaggioService],
  controllers: [MessageController],
  exports: [MessaggioService, TypeOrmModule],
})
export class MessaggioModule {}
