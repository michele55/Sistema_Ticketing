import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.entity';
import { CreateTicketDto } from './create-ticket-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() ticketData: CreateTicketDto): Promise<Ticket> {
    console.log('Dati ricevuti nel DTO:', ticketData);
    return this.ticketService.create(ticketData);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req): Promise<Ticket[]> {
    const user = req.user;
    console.log('User in request:', req.user); // Controlla cosa arriva
    if (!user || !['admin', 'sviluppatore', 'customer'].includes(user.role)) {
      throw new UnauthorizedException('Accesso non autorizzato');
    }
    return this.ticketService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.findOne(+id);
  }
  @Put(':id')
  async aggiornaStato(
    @Param('id') id: number,
    @Body()
    updateData: { stato: string; assignedTo?: number; descrizione?: string },
  ): Promise<Ticket> {
    console.log('Dati ricevuti nel controller2:', updateData.assignedTo);
    return this.ticketService.aggiornaStato(
      id,
      updateData.stato,
      updateData.assignedTo,
      updateData.descrizione,
    );
  }
}
