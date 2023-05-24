import {
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
import { CandidateApplication } from '../../applications/models/trainee/candidateApplication.model';
import { Image } from '../../files/models/image.model';

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
  thirdName: string;

  @Default(Role.CANDIDATE)
  @Column(DataType.ENUM(...Object.values(Role)))
  role: Role;

  @Unique
  @Column
  email: string;

  @Column
  pwd_hash: string;

  @BelongsToMany(() => FrameApplication, () => TraineeOnFrameApplication)
  applications: FrameApplication[];

  @HasOne(() => Image)
  image: Image;
}
