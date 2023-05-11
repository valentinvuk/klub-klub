import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangeUserStatusInput } from './DTO/change-user-status.dto';
import { User, UserRoleRequest } from '@prisma/client';
import { CreateUserRoleRequestInput } from './DTO/create-user-role-request.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async changeUserStatus(
    changeUserStatusInput: ChangeUserStatusInput,
  ): Promise<User> {
    const { userId, isActive } = changeUserStatusInput;

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

  async createUserRoleRequest(
    createUserRoleRequestInput: CreateUserRoleRequestInput,
  ): Promise<UserRoleRequest> {
    const { userId, role } = createUserRoleRequestInput;

    const userRoleRequest = this.prisma.userRoleRequest.create({
      data: { userId, role },
    });

    return userRoleRequest;
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
