import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Test } from './models/test.model';
import { IAnswer, IQuestion } from './models/types';
import { Question } from './models/question.model';
import { TestResult } from './models/testResult.model';
import { TraineeOnFrameApplication } from '../applications/models/frame/traineeOnFrameApplication.model';

@Injectable()
export class TestsService {
  constructor(
    @InjectModel(Test) private testModel: typeof Test,
    @InjectModel(Question) private questionModel: typeof Question,
  ) {}

  async createTest(applicationId: number, questions: IQuestion[]) {
    console.log('questions', questions);
    const test = await this.testModel.create(
      {
        applicationId: applicationId,
        questions,
      },
      { include: [Question] },
    );
    return { testId: test.testId };
  }

  async getTestByFrameApplicationId(id: number) {
    return await this.testModel.findOne({
      where: {
        applicationId: id,
      },
      include: [{ model: Question }],
    });
  }

  async deleteTest(applicationId: number) {
    await this.testModel.destroy({ where: { applicationId: applicationId } });
  }
}
