import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FrameApplication } from '../models/frame/frameApplication.model';
import { WorkExperience } from '../models/frame/workExperience.model';
import { CreateFrameApplicationDto } from '../models/frame/CreateFrameApplicationDto';
import { IFrameApplication } from '../models/frame/frameApplication.interface';
import {
  FrameApplicationStatus,
  MentorStatus,
  TraineeStatus,
} from '../models/frame/frameApplicationStatus.enum';
import { TraineeOnFrameApplication } from '../models/frame/traineeOnFrameApplication.model';
import { User } from '../../auth/models/user.model';
import { CandidateApplication } from '../models/candidate/candidateApplication.model';
import { Direction } from '../../auth/models/direction.enum';
import { Role } from '../../auth/models/role.enum';
import { Position } from '../models/candidate/positionModel';

@Injectable()
export class FrameApplicationsService {
  constructor(
    @InjectModel(CandidateApplication)
    private candidateApplicationModel: typeof CandidateApplication,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(FrameApplication)
    private frameApplicationModel: typeof FrameApplication,
    @InjectModel(WorkExperience)
    private workExperienceModel: typeof WorkExperience,
    @InjectModel(TraineeOnFrameApplication)
    private traineeOnFrameApplicationModel: typeof TraineeOnFrameApplication,
  ) {}

  async getMentorByApplicationId(applicationId: number) {
    const id = (
      await this.frameApplicationModel.findOne({
        where: { applicationId: applicationId },
      })
    ).mentorId;
    return await this.userModel.findOne({ where: { userId: id } });
  }

  async getMentorsByDirection(direction: Direction) {
    return await this.userModel.findAll({
      where: { direction: direction, role: Role.MENTOR },
    });
  }
  async createApplication(application: CreateFrameApplicationDto) {
    const app = await this.frameApplicationModel.create({
      frameId: application.frameId,
      position: application.position,
      address: application.address,
      description: application.description,
      organization: application.organization,
      direction: application.direction,
      mentorId: application.mentorId,
    });
    const workExperience = application.workExperience.map((element) => {
      return { applicationId: app.applicationId, value: element };
    });
    await this.workExperienceModel.bulkCreate(workExperience);
    return app.applicationId;
  }

  async submitTraineeByMentor(
    traineeId: number,
    applicationId: number,
    status: MentorStatus,
  ) {
    await this.traineeOnFrameApplicationModel.update(
      { mentorStatus: status },
      { where: { traineeId: traineeId, applicationId: applicationId } },
    );
  }

  async submitTraineeByFrame(
    traineeId: number,
    applicationId: number,
    status: TraineeStatus,
  ) {
    await this.traineeOnFrameApplicationModel.update(
      { traineeStatus: status },
      { where: { traineeId: traineeId, applicationId: applicationId } },
    );
  }

  async getApplicationsByMentorId(mentorId: number) {
    return await this.frameApplicationModel.findAll({
      where: { mentorId: mentorId },
    });
  }

  async getTraineeFrameApplication(traineeId: number) {
    return await this.traineeOnFrameApplicationModel.findAll({
      where: { traineeId: traineeId },
    });
  }

  async getFrameApplications() {
    return await this.frameApplicationModel.findAll({
      include: [{ model: WorkExperience }],
    });
  }

  async getFrameApplicationsByFrameId(id: number) {
    return await this.frameApplicationModel.findAll({
      where: { frameId: id },
      include: [WorkExperience],
    });
  }

  async getFrameApplicationById(applicationId: number) {
    return await this.frameApplicationModel.findOne({
      where: { applicationId: applicationId },
      include: [WorkExperience],
    });
  }

  async submitTraineeRespond(
    applicationId: number,
    traineeId: number,
    result: number,
  ) {
    console.log('SUBMIT', applicationId, traineeId, result);
    await this.traineeOnFrameApplicationModel.create({
      traineeId: traineeId,
      applicationId: applicationId,
      traineeResult: result ?? null,
    });
  }

  async submitCuratorRespond(
    applicationId: number,
    status: FrameApplicationStatus,
  ) {
    await this.frameApplicationModel.update(
      { status: status },
      { where: { applicationId: applicationId } },
    );
  }

  async deleteFrameApplication(applicationId: number) {
    await this.frameApplicationModel.destroy({
      where: { applicationId: applicationId },
    });
  }

  async updateFrameApplication(application: IFrameApplication) {
    await this.frameApplicationModel.update(application, {
      where: { applicationId: application.applicationId },
    });

    await Promise.all(
      application.workExperience.map((exp) =>
        this.workExperienceModel.update(
          { value: exp.value },
          {
            where: { applicationId: application.applicationId },
          },
        ),
      ),
    );
  }

  async getTraineesForMentorByApplicationId(id: number) {
    const trainees = (
      await this.traineeOnFrameApplicationModel.findAll({
        where: { applicationId: id, mentorStatus: MentorStatus.PENDING },
      })
    ).map((element) => element.traineeId);
    return (
      await this.userModel.findAll({
        include: [{ model: CandidateApplication, include: [Position] }],
      })
    ).filter((user) => trainees.includes(user.userId));
  }

  async getTraineesForFrameByApplicationId(id: number) {
    const trainees = (
      await this.traineeOnFrameApplicationModel.findAll({
        where: {
          applicationId: id,
          mentorStatus: MentorStatus.APPROVED,
          traineeStatus: TraineeStatus.PENDING,
        },
      })
    ).map((element) => element.traineeId);
    return (
      await this.userModel.findAll({
        include: [{ model: CandidateApplication, include: [Position] }],
      })
    ).filter((user) => trainees.includes(user.userId));
  }
}
