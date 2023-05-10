import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field((type) => ID)
  id: string;
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  isActive: boolean;
}
