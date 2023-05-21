import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { FrameApplication } from './frameApplication.model';

@Table({})
export class WorkExperience extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  workExperienceId: number;

  @ForeignKey(() => FrameApplication)
  @Column
  applicationId: number;

  // @BelongsTo(() => FrameApplication)
  // application: FrameApplication;

  @Column
  value: string;
}
