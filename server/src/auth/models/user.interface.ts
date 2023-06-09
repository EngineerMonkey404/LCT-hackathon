import { Role } from './role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Direction } from './direction.enum';

export interface IUser {
  userId?: number;
  firstName?: string;

  direction?: Direction;
  organization: Organization;
  secondName?: string;
  thirdName?: string;
  email?: string;
  password?: string;
  role?: Role;
  imageId?: number;
}

export interface Organization {
  name: string;
  coordinates: number[];
  address: string;
}
