import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

import { Role } from './role.enum';
import { FrameApplication } from '../../applications/models/frameApplication.model';
import { TraineeOnFrameApplication } from '../../applications/models/traineeOnFrameApplication.model';

@Table({})
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Unique
  @Column
  userId: number;

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

  @HasMany(() => FrameApplication, 'frameId')
  frameApplications: FrameApplication;

  @HasMany(() => FrameApplication, 'curatorId')
  curatorApplications: FrameApplication;

  @BelongsToMany(() => FrameApplication, () => TraineeOnFrameApplication)
  applications: FrameApplication[];
}
