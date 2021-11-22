import { Prisma, User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RefreshTokensService {

  constructor(private prisma: PrismaService) { }

  async find(refreshTokenWhereUniqueInput: Prisma.RefreshTokenWhereInput) {
    return this.prisma.refreshToken.findFirst({
      where: refreshTokenWhereUniqueInput,
      include: {
        user: true
      }
    });
  }

  async createRefreshToken(data: Prisma.RefreshTokenUncheckedCreateInput) {
    return this.prisma.refreshToken.create({ data })
  }

  async deleteRefreshToken(userId: number) {
    return this.prisma.refreshToken.deleteMany({
      where: {
        userId
      }
    })
  }

}
