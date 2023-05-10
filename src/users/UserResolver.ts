import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from './user.type';

@Resolver()
export class UserResolver {
  constructor(private prisma: PrismaService) {}

  @Query((returns) => [UserType])
  @UseGuards(JwtAuthGuard)
  users() {
    // TODO: extract to service
    return this.prisma.user.findMany();
  }

  @Mutation((returns) => UserType)
  @UseGuards(JwtAuthGuard)
  async changeUserStatus(
    @Args({ name: 'userId', type: () => String }) userId: string,
    @Args({ name: 'isActive', type: () => Boolean }) isActive: boolean,
  ) {
    // TODO: extract to service
    const user = this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive,
      },
    });

    return user;
  }
}
