import { Module } from '@nestjs/common';
import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './models/question.model';
import { Test } from './models/test.model';
import { TestResult } from './models/testResult.model';
import { QuestionsOnTest } from './models/questionsOnTest.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Question, Test, TestResult, QuestionsOnTest]),
  ],
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule {}
