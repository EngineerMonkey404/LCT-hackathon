import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CandidateApplicationsService } from '../services/candidateApplications.service';
import { CreateCandidateApplicationDto } from '../models/candidate/CreateCandidateApplicationDto';
import { RequireRoles } from '../../auth/guards/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { CandidateApplicationStatus } from '../models/candidate/candidateApplicationStatus.enum';
import { ICandidateApplication } from '../models/candidate/candidateApplication.interface';
import { application } from 'express';

@ApiTags('Заявки кандидатов')
@Controller('applications')
export class CandidateApplicationsController {
  constructor(
    private readonly candidateApplicationService: CandidateApplicationsService,
  ) {}

  @ApiOperation({ summary: 'Получение заявок кандидатов' })
  @Get('candidate-applications')
  async getAllCandidateApplications() {
    return await this.candidateApplicationService.getAllCandidateApplications();
  }

  @ApiOperation({ summary: 'Создание заявки' })
  @ApiBody({ type: CreateCandidateApplicationDto })
  @Post('candidate-application')
  async createCandidateApplication(
    @Body() application: CreateCandidateApplicationDto,
  ) {
    await this.candidateApplicationService.createCandidateApplication(
      application,
    );
  }

  @ApiOperation({ summary: 'Обновление статуса заявки' })
  @Put('candidate-application/submit/:application_id')
  async submitCuratorRespond(
    @Param('application_id', ParseIntPipe) applicationId: number,
    @Query('status') status: CandidateApplicationStatus,
  ) {
    await this.candidateApplicationService.submitCandidateApplication(
      applicationId,
      status,
    );
  }

  @Get('candidate-application/:candidate_id')
  async getCandidateApplicationById(
    @Param('candidate_id', ParseIntPipe) id: number,
  ) {
    return await this.candidateApplicationService.getCandidateApplicationById(
      id,
    );
  }

  @Put('candidate-application/:candidate_id')
  async updateCandidateApplication(
    @Param('candidate_id', ParseIntPipe) candidateId: number,
    @Body() application: ICandidateApplication,
  ) {
    await this.candidateApplicationService.updateCandidateApplication(
      candidateId,
      application,
    );
  }

  @Put('candidate-application/russian-language/:id')
  async updateRussianLanguageTestResult(
    @Query('result', ParseIntPipe) result: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.candidateApplicationService.updateRussianLanguageTestResult(
      result,
      id,
    );
  }

  @Put('candidate-application/computer-literacy/:id')
  async updateComputerLiteracyTestResult(
    @Query('result', ParseIntPipe) result: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.candidateApplicationService.updateComputerLiteracyTestResult(
      result,
      id,
    );
  }

  @Put('candidate-application/information-analysis/:id')
  async updateInformationAnalysisTestResult(
    @Query('result', ParseIntPipe) result: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.candidateApplicationService.updateInformationAnalysisTestResult(
      result,
      id,
    );
  }
}
