import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './auth/models/user.model';
import { ApplicationsModule } from './applications/applications.module';
import { FrameApplication } from './applications/models/frame/frameApplication.model';
import { WorkExperience } from './applications/models/frame/workExperience.model';
import { TraineeOnFrameApplication } from './applications/models/frame/traineeOnFrameApplication.model';
import { Position } from './applications/models/trainee/positionModel';
import { CandidateApplication } from './applications/models/trainee/candidateApplication.model';
import { Image } from './files/models/image.model';
import { FilesModule } from './files/files.module';

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
      ],
      autoLoadModels: true,
      define: {
        timestamps: false,
      },
    }),
    AuthModule,
    ApplicationsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
