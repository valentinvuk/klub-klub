import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';
import { AuthSignInCredentialsDto } from './dto/auth-login-credentials.dto';
import { AuthSignUpCredentialsDto } from './dto/auth-signup-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async createUser(
    authCredentialsDto: AuthSignUpCredentialsDto,
  ): Promise<void> {
    const { email, username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await this.prisma.user
      .create({
        data: { email, username, password: hashedPassword },
      })
      .catch((error) => {
        if (error.code === 'P2002')
          throw new ConflictException('User already exists');
      });
  }

  async login(
    authCredentialsDto: AuthSignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;

    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
