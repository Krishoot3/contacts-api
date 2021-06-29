import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IMessage } from './contacts/interfaces/message.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): IMessage {
    return this.appService.getHello();
  }
}
