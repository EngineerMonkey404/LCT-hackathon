import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FrameApplication } from '../models/frame/frameApplication.model';
import { WorkExperience } from '../models/frame/workExperience.model';
import { CreateFrameApplicationDto } from '../models/frame/CreateFrameApplicationDto';
import { IFrameApplication } from '../models/frame/frameApplication.interface';
import { FrameApplicationStatus } from '../models/frame/frameApplicationStatus.enum';

@Injectable()
export class FrameApplicationsService {
  constructor(
    @InjectModel(FrameApplication)
    private frameApplicationModel: typeof FrameApplication,
    @InjectModel(WorkExperience)
    private workExperienceModel: typeof WorkExperience,
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
    return await this.frameApplicationModel.findAll({});
  }

  async getFrameApplicationsById(id: number) {
    return await this.frameApplicationModel.findAll({
      where: { frameId: id },
    });
  }

  async submitTraineeRespond(applicationId: number, traineeId: number) {
    await this.frameApplicationModel.update(
      { traineeId: traineeId },
      { where: { applicationId: applicationId } },
    );
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
  }
}
