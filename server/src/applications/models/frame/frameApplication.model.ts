import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
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
import { User } from '../../../auth/models/user.model';
import { TraineeOnFrameApplication } from './traineeOnFrameApplication.model';
import { FrameApplicationStatus } from './frameApplicationStatus.enum';
import { Direction } from '../../../auth/models/direction.enum';
import { Test } from '../../../tests/models/test.model';
import { Organization } from '../../../auth/models/user.interface';

@Table({})
export class FrameApplication extends Model {
  @PrimaryKey
  @Unique
  @AutoIncrement
  @Column
  applicationId: number;

  @AllowNull
  @Default(null)
  @Column(DataType.ENUM(...Object.values(Direction)))
  direction: Direction;

  @Column
  position: string;

  @Default(FrameApplicationStatus.PENDING)
  @Column(DataType.ENUM(...Object.values(FrameApplicationStatus)))
  status: FrameApplicationStatus;

  @Column(DataType.JSON)
  organization: Organization;

  @Column
  address: string;

  @Column
  description: string;

  @HasMany(() => WorkExperience)
  workExperience: WorkExperience[];

  @Column
  mentorId: number;

  @Column
  frameId: number;

  @BelongsToMany(() => User, () => TraineeOnFrameApplication)
  user: User[];

  @HasOne(() => Test)
  test: Test;
}
