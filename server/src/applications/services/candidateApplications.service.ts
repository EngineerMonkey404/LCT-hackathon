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
    return await this.candidateApplicationModel.findAll({
      include: [{ model: Position, attributes: ['value'] }],
    });
  }

  async createCandidateApplication(application: CreateCandidateApplicationDto) {
    const app = await this.candidateApplicationModel.create({
      candidateId: application.candidateId,
      direction: application.direction,
      date: application.date,
      nationality: application.nationality,
      city: application.city,
      experience: application.experience,
    });
    const position = application.position.map((pos) => {
      return { applicationId: app.applicationId, value: pos };
    });
    console.log(position);
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

  async getCandidateApplicationsById(id: number) {
    return await this.candidateApplicationModel.findAll({
      where: { candidateId: id },
      include: [Position],
    });
  }
}
