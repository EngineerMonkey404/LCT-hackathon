import { Role } from './role.enum';
import { ApiProperty } from '@nestjs/swagger';

export interface IUser {
  userId?: number;
  firstName?: string;

  secondName?: string;
  thirdName?: string;
  email?: string;
  password?: string;
  role?: Role;
}
