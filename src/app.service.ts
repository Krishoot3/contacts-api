import { Injectable } from '@nestjs/common';
import { IMessage } from './contacts/interfaces/message.interface';

@Injectable()
export class AppService {
  getHello(): IMessage  {
    return {message: 'Hello World!'};
  }
}
