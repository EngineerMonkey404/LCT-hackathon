import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { FrameApplication } from '../../applications/models/frame/frameApplication.model';
import { Question } from './question.model';
import { QuestionsOnTest } from './questionsOnTest.model';

@Table({})
export class Test extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  testId: number;

  @ForeignKey(() => FrameApplication)
  @Column
  applicationId: number;

  @BelongsTo(() => FrameApplication)
  application: FrameApplication;

  @BelongsToMany(() => Question, () => QuestionsOnTest)
  questions: Question[];
}
