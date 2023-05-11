import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User, UserRoleRequest } from '@prisma/client';
import { CurrentUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChangeUserStatusInput } from './DTO/change-user-status.dto';
import { CreateUserRoleRequestInput } from './DTO/create-user-role-request.dto';
import { UserService } from './user.service';
import { UserType } from './user.type';
import { UserRoleRequestType } from './userRoleRequest.type';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [UserType])
  @UseGuards(JwtAuthGuard)
  users() {
    return this.userService.getAllUsers;
  }

  @Mutation((returns) => UserType)
  @UseGuards(JwtAuthGuard)
  async changeUserStatus(
    @Args('changeUserStatusInput') changeUserStatusInput: ChangeUserStatusInput,
  ) {
    return this.userService.changeUserStatus(changeUserStatusInput);
  }

  @Mutation((returns) => UserRoleRequestType)
  @UseGuards(JwtAuthGuard)
  async createUserRoleRequest(
    @Args('createUserRoleRequestInput')
    createUserRoleRequestInput: CreateUserRoleRequestInput,
  ) {
    return this.userService.createUserRoleRequest(createUserRoleRequestInput);
  }
}
