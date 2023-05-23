import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { CandidateApplication } from './candidateApplication.model';

@Table({})
export class Position extends Model {
  @PrimaryKey
  @Unique
  @AutoIncrement
  @Column
  positionId: number;

  @ForeignKey(() => CandidateApplication)
  @Column
  applicationId: number;

  @Column
  value: string;
}
