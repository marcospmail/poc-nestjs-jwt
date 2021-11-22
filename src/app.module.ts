import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-guard.auth';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { RefreshTokensService } from './refresh-tokens/refresh-tokens.service';
import { RefreshTokensModule } from './refresh-tokens/refresh-tokens.module';

@Module({
  imports: [AuthModule, UsersModule, PostsModule, RefreshTokensModule],
  controllers: [AppController],
  providers: [
    AppService, 
    {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }, RefreshTokensService,
],
})
export class AppModule {}
