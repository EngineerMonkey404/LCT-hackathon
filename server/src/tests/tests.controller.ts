import { Body, Controller, Param, Post } from '@nestjs/common';
import { TestsService } from './tests.service';
import { Question } from './models/types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Тест')
@Controller('tests')
export class TestsController {
  constructor(private testService: TestsService) {}

  @Post('create-test/:application-id')
  async createTest(
    @Param('application-id') applicationId: number,
    @Body() questions: Question[],
  ) {
    return await this.testService.createTest({
      applicationId: applicationId,
      questions: questions,
    });
  }
}
