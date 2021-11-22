import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RefreshTokensService } from './refresh-tokens.service';
import { RefreshTokensController } from './refresh-tokens.controller';

@Module({
  providers: [PrismaService, RefreshTokensService],
  exports: [PrismaService, RefreshTokensService],
  controllers: [RefreshTokensController]
})
export class RefreshTokensModule {}
