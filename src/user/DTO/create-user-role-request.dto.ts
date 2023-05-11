import { Field, InputType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@InputType()
export class CreateUserRoleRequestInput {
  @Field()
  userId: string;
  @Field()
  role: Role;
}
