import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChangeUserStatusInput {
  @Field()
  userId: string;
  @Field()
  isActive: boolean;
}
