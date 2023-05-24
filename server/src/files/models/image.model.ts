import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../../auth/models/user.model';

@Table({})
export class Image extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  imageId: number;

  @Column
  path: string;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
