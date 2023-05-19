import { Role } from './role.enum';
import { ApiProperty } from '@nestjs/swagger';

export interface IUser {
  id?: number;
  firstName?: string;
  secondName?: string;
  email?: string;
  password?: string;
  role?: Role;
}
