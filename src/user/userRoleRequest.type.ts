import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { UserType } from './user.type';

@ObjectType()
export class UserRoleRequestType {
  @Field((type) => ID)
  id: string;

  @Field((type) => UserType)
  user: User;
}
