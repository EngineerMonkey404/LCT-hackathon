import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FrameApplication } from '../models/frame/frameApplication.model';
import { WorkExperience } from '../models/frame/workExperience.model';
import { CreateFrameApplicationDto } from '../models/frame/CreateFrameApplicationDto';

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

  async getFrameApplications(id: number) {
    const apps = await this.frameApplicationModel.findAll({
      include: [WorkExperience],
      where: { frameId: id },
    });
    return apps;
  }
}
