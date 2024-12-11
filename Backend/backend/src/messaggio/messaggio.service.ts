import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Messaggio } from './messaggio.entity';
import { Ticket } from '../ticket/ticket.entity';
import { User } from '../user/user.entity';

@Injectable()
export class MessaggioService {
  constructor(
    @InjectRepository(Messaggio)
    private readonly messageRepository: Repository<Messaggio>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createMessage(
    ticketId: number,
    userId: number,
    createMessageDto: { descrizione: string },
  ) {
    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
    });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const message = this.messageRepository.create({
      descrizione: createMessageDto.descrizione,
      inviatoDa: user,
      ticket: ticket,
    });

    return this.messageRepository.save(message);
  }

  async getMessagesByTicket(ticketId: number) {
    return this.messageRepository.find({
      where: { ticket: { id: ticketId } },
      relations: ['inviatoDa', 'ticket'],
      order: { createdAt: 'ASC' },
    });
  }
}
