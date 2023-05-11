import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';
import { UserResolver } from './UserResolver';

@Module({
  providers: [UserResolver, PrismaService, JwtStrategy, UserService],
  imports: [PrismaModule, AuthModule],
})
export class UserModule {}
