import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CandidateApplication } from '../models/candidate/candidateApplication.model';
import { ICandidateApplication } from '../models/candidate/candidateApplication.interface';
import { CreateCandidateApplicationDto } from '../models/candidate/CreateCandidateApplicationDto';
import { CandidateApplicationStatus } from '../models/candidate/candidateApplicationStatus.enum';
import { Position } from '../models/candidate/positionModel';
import { IFrameApplication } from '../models/frame/frameApplication.interface';
import { TraineeOnFrameApplication } from '../models/frame/traineeOnFrameApplication.model';
import { FrameApplicationStatus } from '../models/frame/frameApplicationStatus.enum';
import { Direction } from '../../auth/models/direction.enum';
import { User } from '../../auth/models/user.model';
import { Role } from '../../auth/models/role.enum';

@Injectable()
export class CandidateApplicationsService {
  constructor(
    @InjectModel(CandidateApplication)
    private candidateApplicationModel: typeof CandidateApplication,
    @InjectModel(Position) private positionModel: typeof Position,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async getAllCandidateApplications() {
    return await this.candidateApplicationModel.findAll({
      include: [{ model: Position, attributes: ['value'] }],
    });
  }

  async getAllPendingCandidateApplications() {
    return await this.candidateApplicationModel.findAll({
      where: { status: FrameApplicationStatus.PENDING },
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
      education: application.education,
      course: application.course,
    });
    const position = application.position.map((pos) => {
      return { applicationId: app.applicationId, value: pos };
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

  async getCandidateApplicationById(id: number) {
    return await this.candidateApplicationModel.findOne({
      where: { candidateId: id },
      include: [Position],
    });
  }

  async updateCandidateApplication(
    id: number,
    application: ICandidateApplication,
  ) {
    await this.candidateApplicationModel.update(application, {
      where: { candidateId: id },
    });
    application.position.map(async (pos) => {
      if (pos.positionId)
        await this.positionModel.update(
          { value: pos.value },
          {
            where: {
              applicationId: application.applicationId,
              positionId: pos.positionId,
            },
          },
        );
      else {
        await this.positionModel.create({
          value: pos.value,
          applicationId: application.applicationId,
        });
      }
    });
  }

  async updateRussianLanguageTestResult(result: number, id: number) {
    await this.candidateApplicationModel.update(
      { russianLanguageTestResult: result },
      { where: { applicationId: id } },
    );
  }

  async updateInformationAnalysisTestResult(result: number, id: number) {
    await this.candidateApplicationModel.update(
      { informationAnalysisTestResult: result },
      { where: { applicationId: id } },
    );
  }

  async updateComputerLiteracyTestResult(result: number, id: number) {
    await this.candidateApplicationModel.update(
      { computerLiteracyTestResult: result },
      { where: { applicationId: id } },
    );
  }
}
