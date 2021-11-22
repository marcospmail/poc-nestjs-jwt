import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto'
import { isAfter } from 'date-fns'

import { RefreshTokensService } from 'src/refresh-tokens/refresh-tokens.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

import hash from 'src/util/hash';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private refreshTokenService: RefreshTokensService,
    private jwtService: JwtService) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.user({ email })

    if (!user) {
      return null
    }

    const isValidPassword = bcrypt.compareSync(pass, user.password);

    if (isValidPassword) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async generateJwt(refreshTokenValue: string) {
    const refreshTokenData = await this.refreshTokenService.find({
      token: refreshTokenValue
    })

    if (!refreshTokenData) {
      return null
    }

    const { user, ...refreshToken } = refreshTokenData

    if (isAfter(new Date(), refreshToken.expires)) {
      return null
    }
    
    const payload = { email: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
      user
    }
  }

  async signUp(user: CreateUserDto) {
    const hashPassword = await hash(user.password)
    await this.usersService.createUser({ ...user, password: hashPassword})
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id }

    const token = crypto.randomBytes(40).toString('hex')
    await this.refreshTokenService.deleteRefreshToken(user.id)

    const insertedRefreshToken = await this.refreshTokenService.createRefreshToken({
      userId: user.id,
      token: token,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 10000) // 7 days
    })

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: insertedRefreshToken
    }
  }
}
