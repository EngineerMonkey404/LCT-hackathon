import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Put } from '@nestjs/common';
import { CandidateApplicationsService } from '../services/candidateApplications.service';

@ApiTags('Заявки стажера')
@Controller('applications')
export class CandidateApplicationsController {
  constructor(
    private readonly candidateApplicationService: CandidateApplicationsService,
  ) {}

  @Get('getAllTraineeApplications')
  async getAllTraineeApplications() {
    return await this.candidateApplicationService.getAllCandidateApplications();
  }

  @Put('createTraineeApplication')
  async createTraineeApplication() {}
}
