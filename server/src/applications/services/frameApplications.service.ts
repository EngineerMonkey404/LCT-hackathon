import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FrameApplication } from '../models/frameApplication.model';
import { WorkExperience } from '../models/workExperience.model';
import { CreateFrameApplicationDto } from '../models/CreateFrameApplicationDto';

@Injectable()
export class FrameApplicationsService {
  constructor(
    @InjectModel(FrameApplication)
    private frameApplicationModel: typeof FrameApplication,
    @InjectModel(WorkExperience)
    private workExperienceModel: typeof WorkExperience,
  ) {}
  async createApplication(application: CreateFrameApplicationDto) {
    const id = (
      await this.frameApplicationModel.create({
        frameId: application.frameId,
        position: application.position,
        address: application.address,
        description: application.description,
        organization: application.organization,
      })
    ).applicationId;

    const workExperience = application.workExperience.map((element) => {
      return { applicationId: id, value: element };
    });
    await this.workExperienceModel.bulkCreate(workExperience);

    return id;
  }

  async getFrameApplications(id: number) {
    return await this.frameApplicationModel.findAll({ where: { frameId: id } });
  }
}
