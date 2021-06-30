import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger.config';
import { dataCreation } from './helpers/helpers';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  dataCreation();
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
