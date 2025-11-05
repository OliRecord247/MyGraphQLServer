import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCors from '@fastify/cors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app
    .getHttpAdapter()
    .getInstance()
    .register(fastifyCors, {
      origin: ['http://localhost:5173'],
    });
  await app.listen(4000, '0.0.0.0');
}

bootstrap();
