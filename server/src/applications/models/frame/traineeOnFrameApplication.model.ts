import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../../auth/models/user.model';
import { FrameApplication } from './frameApplication.model';

@Table({})
export class TraineeOnFrameApplication extends Model {
  @ForeignKey(() => User)
  @Column
  traineeId: number;

  @ForeignKey(() => FrameApplication)
  @Column
  applicationId: number;
}
