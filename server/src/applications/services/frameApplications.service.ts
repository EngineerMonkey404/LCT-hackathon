import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FrameApplication } from '../models/frame/frameApplication.model';
import { WorkExperience } from '../models/frame/workExperience.model';
import { CreateFrameApplicationDto } from '../models/frame/CreateFrameApplicationDto';
import { IFrameApplication } from '../models/frame/frameApplication.interface';
import { FrameApplicationStatus } from '../models/frame/frameApplicationStatus.enum';
import { TraineeOnFrameApplication } from '../models/frame/traineeOnFrameApplication.model';
import { User } from '../../auth/models/user.model';
import { CandidateApplication } from '../models/candidate/candidateApplication.model';
import { Direction } from '../../auth/models/direction.enum';
import { Role } from '../../auth/models/role.enum';

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
    });
    const workExperience = application.workExperience.map((element) => {
      return { applicationId: app.applicationId, value: element };
    });
    await this.workExperienceModel.bulkCreate(workExperience);
    return app.id;
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

  async submitTraineeRespond(applicationId: number, traineeId: number) {
    await this.traineeOnFrameApplicationModel.create({
      traineeId: traineeId,
      applicationId: applicationId,
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

  async getTraineesByApplicationId(id: number) {
    const trainees = (
      await this.traineeOnFrameApplicationModel.findAll({
        where: { applicationId: id },
      })
    ).map((element) => element.traineeId);
    console.log(trainees);
    console.log(
      await this.userModel.findAll({
        include: [CandidateApplication],
      }),
    );
    return (
      await this.userModel.findAll({
        include: [CandidateApplication],
      })
    ).filter((user) => trainees.includes(user.userId));
  }
}
