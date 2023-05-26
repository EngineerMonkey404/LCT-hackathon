import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Test } from './models/test.model';
import { IAnswer, IQuestion } from './models/types';
import { Question } from './models/question.model';

@Injectable()
export class TestsService {
  constructor(
    @InjectModel(Test) private testModel: typeof Test,
    @InjectModel(Question) private questionModel: typeof Question,
  ) {}

  async createTest(applicationId: number, questions: IQuestion[]) {
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

  async applyTest(testId: number, answers: IAnswer[]) {
    return (
      await this.testModel.findOne({ where: { testId }, include: [Question] })
    ).questions.map((q) => ({
      questionId: q.questionId,
      result:
        answers.find((a) => a.questionId === q.questionId)?.answer ===
        q.rightAnswer,
    }));
  }
}
