import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

import * as dotenv from 'dotenv'
import { RedisModule } from 'src/redis/redis.module'
import { MailService } from 'src/mail/mail.service'
import { PrismaService } from 'prisma/prisma.service'

dotenv.config()

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: `${process.env.ACCESS_TTL}s` },
    }),
    RedisModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, MailService, PrismaService],
  exports: [AuthService]
})
export class AuthModule {}
