import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataCreation } from './helpers/helpers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dataCreation();
  await app.listen(3000);
}
bootstrap();
