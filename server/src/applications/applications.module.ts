import { forwardRef, Module } from '@nestjs/common';
import { FrameApplicationsController } from './controllers/frameApplications.controller';
import { FrameApplicationsService } from './services/frameApplications.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FrameApplication } from './models/frame/frameApplication.model';
import { WorkExperience } from './models/frame/workExperience.model';
import { TraineeOnFrameApplication } from './models/frame/traineeOnFrameApplication.model';
import { AuthModule } from '../auth/auth.module';
import { CandidateApplicationsController } from './controllers/candidateApplications.controller';
import { Position } from './models/candidate/positionModel';
import { CandidateApplication } from './models/candidate/candidateApplication.model';
import { CandidateApplicationsService } from './services/candidateApplications.service';
import { User } from '../auth/models/user.model';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([
      FrameApplication,
      WorkExperience,
      TraineeOnFrameApplication,
      Position,
      CandidateApplication,
      User,
    ]),
  ],
  controllers: [FrameApplicationsController, CandidateApplicationsController],
  providers: [FrameApplicationsService, CandidateApplicationsService],
})
export class ApplicationsModule {}
