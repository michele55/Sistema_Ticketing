import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, User])],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService, TypeOrmModule],
})
export class TicketModule {}
