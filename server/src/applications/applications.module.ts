import { forwardRef, Module } from '@nestjs/common';
import { FrameApplicationsController } from './controllers/frameApplications.controller';
import { FrameApplicationsService } from './services/frameApplications.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FrameApplication } from './models/frame/frameApplication.model';
import { WorkExperience } from './models/frame/workExperience.model';
import { TraineeOnFrameApplication } from './models/frame/traineeOnFrameApplication.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([
      FrameApplication,
      WorkExperience,
      TraineeOnFrameApplication,
    ]),
  ],
  controllers: [FrameApplicationsController],
  providers: [FrameApplicationsService],
})
export class ApplicationsModule {}
