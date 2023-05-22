import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FrameApplication } from '../models/frame/frameApplication.model';
import { WorkExperience } from '../models/frame/workExperience.model';
import { CreateFrameApplicationDto } from '../models/frame/CreateFrameApplicationDto';
import { IFrameApplication } from '../models/frame/frameApplication.interface';
import { FrameApplicationStatus } from '../models/frame/frameApplicationStatus.enum';
import { TraineeOnFrameApplication } from '../models/frame/traineeOnFrameApplication.model';

@Injectable()
export class FrameApplicationsService {
  constructor(
    @InjectModel(FrameApplication)
    private frameApplicationModel: typeof FrameApplication,
    @InjectModel(WorkExperience)
    private workExperienceModel: typeof WorkExperience,
    @InjectModel(TraineeOnFrameApplication)
    private traineeOnFrameApplicationModel: typeof TraineeOnFrameApplication,
  ) {}
  async createApplication(application: CreateFrameApplicationDto) {
    const app = await this.frameApplicationModel.create({
      frameId: application.frameId,
      position: application.position,
      address: application.address,
      description: application.description,
      organization: application.organization,
    });
    const workExperience = application.workExperience.map((element) => {
      return { applicationId: app.applicationId, value: element };
    });
    await this.workExperienceModel.bulkCreate(workExperience);
    return app.id;
  }

  async getFrameApplications() {
    return await this.frameApplicationModel.findAll({
      include: [WorkExperience],
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
    curatorId: number,
    status: FrameApplicationStatus,
  ) {
    await this.frameApplicationModel.update(
      { curatorId: curatorId, status: status },
      { where: { applicationId: applicationId } },
    );
  }

  async getTraineesByFrameApplicationId(applicationId: number) {
    return await this.frameApplicationModel.findAll({
      where: {
        applicationId: applicationId,
      },
    });
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

    application.workExperience.map(
      async (exp) =>
        await this.workExperienceModel.update(
          { value: exp.value },
          {
            where: { applicationId: application.applicationId },
          },
        ),
    );
  }
}
