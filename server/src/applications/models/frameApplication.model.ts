import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  Default,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { WorkExperience } from './workExperience.model';
import { User } from '../../auth/models/user.model';
import { TraineeOnFrameApplication } from './traineeOnFrameApplication.model';

@Table({})
export class FrameApplication extends Model {
  @PrimaryKey
  @Unique
  @AutoIncrement
  @Column
  applicationId: number;

  @Column
  position: string;

  @Column
  organization: string;

  @Column
  address: string;

  @Column
  description: string;

  @HasMany(() => WorkExperience, 'applicationId')
  workExperience: WorkExperience[];

  @ForeignKey(() => User)
  @Column
  frameId: number;

  @AllowNull
  @ForeignKey(() => User)
  @Column
  curatorId: number;

  @BelongsToMany(() => User, () => TraineeOnFrameApplication)
  user: User[];
}
