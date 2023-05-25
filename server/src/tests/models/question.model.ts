import {
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { QuestionsOnTest } from './questionsOnTest.model';
import { Test } from './test.model';

@Table({})
export class Question extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  questionId: number;

  @Column
  question: string;

  @Column
  variantA: string;

  @Column
  variantB: string;

  @Column
  variantC: string;

  @Column
  variantD: string;

  @Column
  rightAnswer: string;

  @BelongsToMany(() => Test, () => QuestionsOnTest)
  tests: Test[];
}
