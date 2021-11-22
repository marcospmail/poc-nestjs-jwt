import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, PostsService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
