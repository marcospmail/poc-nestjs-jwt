import { Controller, Request, Post, UseGuards, Body, Res, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/jwt-guard.auth';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('auth/refreshjwt')
  async generateJwt(@Req() req, @Res() res) {
    const refreshToken = req.cookies.refresh_token
    const response = await this.authService.generateJwt(refreshToken)

    if (!response) {
      res.clearCookie('refresh_token', {
        httpOnly: true,
      });
      throw new UnauthorizedException()
    }

    return response
  }

  @Public()
  @Post('auth/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Res() resp) {
    const { refresh_token, ...data} = await this.authService.login(req.user)

    return resp.cookie('refresh_token', refresh_token.token, {
      // domain: 'localhost',
      httpOnly: true,
      expires: refresh_token.expires,
    })
    .json(data)
  }

}
