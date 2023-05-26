import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../../auth/models/user.model';
import { FrameApplication } from './frameApplication.model';
import { MentorStatus, TraineeStatus } from './frameApplicationStatus.enum';

@Table({})
export class TraineeOnFrameApplication extends Model {
  @ForeignKey(() => User)
  @Column
  traineeId: number;

  @ForeignKey(() => FrameApplication)
  @Column
  applicationId: number;

  @Default(TraineeStatus.PENDING)
  @Column(DataType.ENUM(...Object.values(TraineeStatus)))
  traineeStatus: string;

  @Default(MentorStatus.PENDING)
  @Column(DataType.ENUM(...Object.values(MentorStatus)))
  mentorStatus: string;

  @Column
  traineeResult: number;
}
