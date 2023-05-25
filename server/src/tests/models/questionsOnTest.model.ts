import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Question } from './question.model';
import { Test } from './test.model';

@Table({})
export class QuestionsOnTest extends Model {
  @ForeignKey(() => Question)
  @Column
  questionId: number;

  @ForeignKey(() => Test)
  @Column
  testId: number;
}
