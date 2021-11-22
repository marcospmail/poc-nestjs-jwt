import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3001',
      credentials: true,
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app)

  await app.listen(3000);
}
bootstrap();
