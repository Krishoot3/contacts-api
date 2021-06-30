import { DocumentBuilder } from '@nestjs/swagger';


export const swaggerConfig = new DocumentBuilder()
.setTitle('Contacts API')
.setDescription('The contacts API description')
.setVersion('1.0')
.build();