import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Role } from '../auth/models/role.enum';

@Table({})
export class Invites extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  inviteId: number;

  @Column
  path: string;

  @Default(Role.CANDIDATE)
  @Column(DataType.ENUM(...Object.values(Role)))
  role: Role;
}
