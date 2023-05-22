import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CandidateApplication } from '../models/trainee/candidateApplication.model';

@Injectable()
export class CandidateApplicationsService {
  constructor(
    @InjectModel(CandidateApplication)
    private traineeApplicationModel: typeof CandidateApplication,
  ) {}

  async getAllCandidateApplications() {
    return await this.traineeApplicationModel.findAll({});
  }
}
