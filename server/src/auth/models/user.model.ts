import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

import { Role } from './role.enum';
import { FrameApplication } from '../../applications/models/frame/frameApplication.model';
import { TraineeOnFrameApplication } from '../../applications/models/frame/traineeOnFrameApplication.model';
import { CandidateApplication } from '../../applications/models/candidate/candidateApplication.model';
import { Image } from '../../files/models/image.model';
import { Direction } from './direction.enum';

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
  organizationName: string;

  @Column
  organizationAddress: string;

  @Column
  organizationCoordinateX: number;

  @Column
  organizationCoordinateY: number;

  @Column
  thirdName: string;

  @Default(Role.CANDIDATE)
  @Column(DataType.ENUM(...Object.values(Role)))
  role: Role;

  @AllowNull
  @Default(null)
  @Column(DataType.ENUM(...Object.values(Direction)))
  direction: Direction;

  @Unique
  @Column
  email: string;

  @Column
  pwd_hash: string;

  @HasOne(() => CandidateApplication)
  candidateApplication: CandidateApplication;

  @BelongsToMany(() => FrameApplication, () => TraineeOnFrameApplication)
  frameApplications: FrameApplication[];

  @HasOne(() => Image)
  image: Image;
}
