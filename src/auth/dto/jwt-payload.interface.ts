import { Role } from '@prisma/client';

export interface JwtPayload {
  username: string;
  role: Role;
}
