import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './auth/models/user.model';
import { ApplicationsModule } from './applications/applications.module';
import { FrameApplication } from './applications/models/frame/frameApplication.model';
import { WorkExperience } from './applications/models/frame/workExperience.model';
import { TraineeOnFrameApplication } from './applications/models/frame/traineeOnFrameApplication.model';
import { Position } from './applications/models/candidate/positionModel';
import { CandidateApplication } from './applications/models/candidate/candidateApplication.model';
import { Image } from './files/models/image.model';
import { FilesModule } from './files/files.module';
import { InvitesModule } from './invites/invites.module';
import { TestsModule } from './tests/tests.module';
import { Question } from './tests/models/question.model';
import { QuestionsOnTest } from './tests/models/questionsOnTest.model';
import { Test } from './tests/models/test.model';
import { TestResult } from './tests/models/testResult.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: 'lct',
      models: [
        User,
        FrameApplication,
        WorkExperience,
        TraineeOnFrameApplication,
        Position,
        CandidateApplication,
        Image,
        Question,
        QuestionsOnTest,
        Test,
        TestResult,
      ],
      autoLoadModels: true,
      define: {
        timestamps: false,
      },
    }),
    AuthModule,
    ApplicationsModule,
    FilesModule,
    InvitesModule,
    TestsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
