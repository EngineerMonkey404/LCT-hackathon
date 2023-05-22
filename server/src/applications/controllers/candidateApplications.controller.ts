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
import { CreateCandidateApplicationDto } from '../models/trainee/CreateCandidateApplicationDto';
import { RequireRoles } from '../../auth/guards/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { CandidateApplicationStatus } from '../models/trainee/candidateApplicationStatus.enum';

@ApiTags('Заявки стажера')
@Controller('applications')
export class CandidateApplicationsController {
  constructor(
    private readonly candidateApplicationService: CandidateApplicationsService,
  ) {}

  @RequireRoles(Role.CANDIDATE)
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Получение заявок кандидатов' })
  @Get('getAllCandidateApplications')
  async getAllTraineeApplications() {
    return await this.candidateApplicationService.getAllCandidateApplications();
  }

  @RequireRoles(Role.CANDIDATE)
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Создание заявки' })
  @Post('createCandidateApplication')
  async createCandidateApplication(
    @Body() application: CreateCandidateApplicationDto,
  ) {
    await this.candidateApplicationService.createCandidateApplication(
      application,
    );
  }

  @ApiOperation({ summary: 'Обновление статуса заявки' })
  @Put('submitCandidateApplication/:application_id')
  async submitCuratorRespond(
    @Param('application_id', ParseIntPipe) applicationId: number,
    @Query('status') status: CandidateApplicationStatus,
  ) {
    await this.candidateApplicationService.submitCandidateApplication(
      applicationId,
      status,
    );
  }
}
