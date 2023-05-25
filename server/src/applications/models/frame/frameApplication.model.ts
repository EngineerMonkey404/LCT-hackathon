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

  @Column
  organization: string;

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
}
