import { Controller, Post, Body, Param, UseGuards, Get } from '@nestjs/common';
import { MessaggioService } from './messaggio.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('message')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessaggioService) {}
  @Post(':ticketId')
  async createMessage(
    @Param('ticketId') ticketId: number,
    @Body() createMessageDto: { descrizione: string },
    @Body('userId') userId: number,
  ) {
    return this.messageService.createMessage(
      ticketId,
      userId,
      createMessageDto,
    );
  }
  @Get(':ticketId')
  async getMessages(@Param('ticketId') ticketId: number) {
    return this.messageService.getMessagesByTicket(ticketId);
  }
}
