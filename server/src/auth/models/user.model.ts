import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

import { Role } from './role.enum';
import { ENUM } from 'sequelize';

@Table({})
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Unique
  @Column
  user_id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Default(Role.FRAME)
  @Column(DataType.ENUM(...Object.values(Role)))
  role: Role;

  @Unique
  @Column
  email: string;

  @Column
  pwd_hash: string;
}
