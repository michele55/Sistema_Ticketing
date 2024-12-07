import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Senza prefisso 'auth'
export class AppController {
  constructor(private readonly appService: AppService) {}
}
