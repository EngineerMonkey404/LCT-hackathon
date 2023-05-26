import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { IAnswer, IQuestion } from './models/types';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Тест')
@Controller('tests')
export class TestsController {
  constructor(private testService: TestsService) {}

  @ApiBody({ type: IQuestion, isArray: true })
  @Post('test/:applicationId')
  async createTest(
    @Param('applicationId', ParseIntPipe) applicationId: number,
    @Body()
    questions: IQuestion[],
  ) {
    return await this.testService.createTest(applicationId, questions);
  }

  @Get('test/:applicationId')
  async getTest(@Param('applicationId', ParseIntPipe) applicationId: number) {
    return await this.testService.getTestByFrameApplicationId(applicationId);
  }

  @ApiBody({ type: IAnswer, isArray: true })
  @Post('test-answer/:testId')
  async applyTest(
    @Param('testId', ParseIntPipe) testId: number,
    @Body()
    answers: IAnswer[],
  ) {
    return await this.testService.applyTest(testId, answers);
  }
}
