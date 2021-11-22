import { Controller, Get, Req } from '@nestjs/common';
import { Public } from 'src/auth/jwt-guard.auth';
import { RefreshTokensService } from './refresh-tokens.service';

@Controller('refresh-tokens')
export class RefreshTokensController {

  constructor(private refreshTokenService: RefreshTokensService) {}

  @Public()
  @Get()
  async generateRefreshToken(@Req() req) {
    const refreshToken = req.cookie.refresh_token
    return refreshToken
  }
}
