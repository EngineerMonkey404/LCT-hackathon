import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './auth/models/user.model';
import { ApplicationsModule } from './applications/applications.module';
import { FrameApplication } from './applications/models/frameApplication.model';
import { WorkExperience } from './applications/models/workExperience.model';
import { TraineeOnFrameApplication } from './applications/models/traineeOnFrameApplication.model';

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
      ],
      autoLoadModels: true,
      define: {
        timestamps: false,
      },
    }),
    AuthModule,
    ApplicationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
