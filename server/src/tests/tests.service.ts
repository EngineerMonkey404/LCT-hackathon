import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Test } from './models/test.model';
import { CreateTestDto } from './models/types';
import { Question } from './models/question.model';

@Injectable()
export class TestsService {
  constructor(
    @InjectModel(Test) private testModel: typeof Test,
    @InjectModel(Question) private questionModel: typeof Question,
  ) {}

  async createTest(test: CreateTestDto) {
    const testId = await this.testModel.create({
      applicationId: test.applicationId,
    });
    const questions = test.questions.map((question) => {
      return { ...question, testId: testId };
    });
    await this.questionModel.bulkCreate(questions);
    return testId;
  }

  async getTestByFrameApplicationId(id: number) {
    return await this.testModel.findOne({
      where: {
        applicationId: id,
      },
    });
  }
}
