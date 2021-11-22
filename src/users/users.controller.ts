import { Controller, Request, Get, Response } from '@nestjs/common';
import { Public } from 'src/auth/jwt-guard.auth';

@Controller('users')
export class UsersController {

  @Public()
  @Get('profile')
  getProfile(@Request() req) {
    return 
  }
}
