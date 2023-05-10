import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class createUserType {
  username: string;
  password: string;
}
