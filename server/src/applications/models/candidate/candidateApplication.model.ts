import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Position } from './positionModel';
import { CandidateApplicationStatus } from './candidateApplicationStatus.enum';
import { User } from '../../../auth/models/user.model';
import { All } from '@nestjs/common';

@Table({})
export class CandidateApplication extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  applicationId: number;

  @Column
  direction: string;

  @Default(CandidateApplicationStatus.PENDING)
  @Column(DataType.ENUM(...Object.values(CandidateApplicationStatus)))
  status: CandidateApplicationStatus;

  @Column
  date: Date;

  @Column
  nationality: string;

  @Column
  city: string;

  @Column
  experience: boolean;

  @Column
  education: string;

  @Column
  course: string;

  @HasMany(() => Position)
  position: Position[];

  @ForeignKey(() => User)
  @Column
  candidateId: number;

  @AllowNull
  @Column
  russianLanguageTestResult: number;

  @AllowNull
  @Column
  informationAnalysisTestResult: number;

  @AllowNull
  @Column
  computerLiteracyTestResult: number;

  @BelongsTo(() => User)
  user: User;
}
