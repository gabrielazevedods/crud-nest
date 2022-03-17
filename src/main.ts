import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterception } from './interceptors/transform.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterception());
  await app.listen(3000);
}
bootstrap();
