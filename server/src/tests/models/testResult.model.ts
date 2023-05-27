import { Column, Model, Table } from 'sequelize-typescript';

@Table({})
export class TestResult extends Model {
  @Column
  traineeId: number;
  @Column
  applicationId: number;
  @Column
  result: number;
}
