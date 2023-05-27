import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
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

  @Delete('test/:applicationId')
  async deleteTest(@Param('application_id') applicationId: number) {
    await this.testService.deleteTest(applicationId);
  }

  // @ApiBody({ type: IAnswer, isArray: true })
  // @Post('test-answer/:application_id/:trainee_id')
  // async applyTest(
  //   @Param('application_id', ParseIntPipe) applicationId: number,
  //   @Param('trainee_id', ParseIntPipe) traineeId: number,
  //   @Query('result') result: number,
  // ) {
  //   return await this.testService.applyTest(applicationId, traineeId, result);
  // }
}
