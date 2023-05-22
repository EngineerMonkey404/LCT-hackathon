import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Position } from './positionModel';

@Table({})
export class CandidateApplication extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  applicationId: number;

  @Column
  direction: string;

  @Column
  date: Date;

  @Column
  nationality: string;

  @Column
  city: string;

  @Column
  experience: boolean;

  @HasMany(() => Position)
  position: Position[];
}
