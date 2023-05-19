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
  secondName: string;

  @Column
  thirdName: string;

  @Default(Role.CANDIDATE)
  @Column(DataType.ENUM(...Object.values(Role)))
  role: Role;

  @Unique
  @Column
  email: string;

  @Column
  pwd_hash: string;
}
