import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CandidateApplication } from '../models/trainee/candidateApplication.model';
import { ICandidateApplication } from '../models/trainee/candidateApplication.interface';
import { CreateCandidateApplicationDto } from '../models/trainee/CreateCandidateApplicationDto';
import { CandidateApplicationStatus } from '../models/trainee/candidateApplicationStatus.enum';
import { Position } from '../models/trainee/positionModel';

@Injectable()
export class CandidateApplicationsService {
  constructor(
    @InjectModel(CandidateApplication)
    private candidateApplicationModel: typeof CandidateApplication,
    @InjectModel(Position) private positionModel: typeof Position,
  ) {}

  async getAllCandidateApplications() {
    const applications = await this.candidateApplicationModel.findAll({
      include: [{ model: Position, attributes: ['value'] }],
    });
    return applications.map((application) => {
      return {
        ...application,
        position: application.position.map((position) => position.value),
      };
    });
  }

  async createCandidateApplication(application: CreateCandidateApplicationDto) {
    const app = await this.candidateApplicationModel.create({
      direction: application.direction,
      date: application.date,
      nationality: application.nationality,
      city: application.city,
      experience: application.experience,
    });
    const position = application.position.map((pos) => {
      return { applicationId: app.applicationId };
    });
    await this.positionModel.bulkCreate(position);
    return app.applicationId;
  }

  async submitCandidateApplication(
    applicationId: number,
    status: CandidateApplicationStatus,
  ) {
    await this.candidateApplicationModel.update(
      { status: status },
      { where: { applicationId: applicationId } },
    );
  }
}
