import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrameApplicationsService } from '../services/frameApplications.service';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateFrameApplicationDto } from '../models/frame/CreateFrameApplicationDto';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { Role } from '../../auth/models/role.enum';
import { RequireRoles } from '../../auth/guards/roles.decorator';
import { IFrameApplication } from '../models/frame/frameApplication.interface';
import {
  FrameApplicationStatus,
  MentorStatus,
} from '../models/frame/frameApplicationStatus.enum';
import { User } from '../../auth/models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Direction } from '../../auth/models/direction.enum';

@ApiTags('Заявки кадра')
@Controller('applications')
export class FrameApplicationsController {
  constructor(private readonly applicationService: FrameApplicationsService) {}

  // @RequireRoles(Role.FRAME)
  // @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Создание заявки' })
  @ApiBody({ type: CreateFrameApplicationDto })
  @Post('frame-application')
  async createApplication(@Body() application: CreateFrameApplicationDto) {
    return await this.applicationService.createApplication(application);
  }

  @ApiOperation({ summary: 'Получение всех заявок по id ментора' })
  @Get('frame-application/mentor/:mentor_id')
  async getMentorsByApplicationId(@Param('id') id: number) {
    return await this.applicationService.getApplicationByMentorId(id);
  }

  @ApiOperation({ summary: 'Подтверждение отклика ментором' })
  @Put('frame-application/:application_id/mentor-submit/:trainee_id')
  async submitTraineeByMentor(
    @Param('application_id') applicationId: number,
    @Param('trainee_id') traineeId: number,
    @Query('status') status: MentorStatus,
  ) {
    await this.applicationService.submitTraineeByMentor(
      traineeId,
      applicationId,
      status,
    );
  }

  @ApiOperation({ summary: 'Подтверждение отклика кадром' })
  @Put('frame-application/:application_id/frame-submit/:trainee_id')
  async submitTraineeByFrame(
    @Param('application_id') applicationId: number,
    @Param('trainee_id') traineeId: number,
    @Query('status') status: MentorStatus,
  ) {
    await this.applicationService.submitTraineeByMentor(
      traineeId,
      applicationId,
      status,
    );
  }

  @ApiOperation({ summary: 'Получение всех наставников по направлению' })
  @Get('frame-application/mentors')
  async getMentorsByDirection(@Query('direction') direction: Direction) {
    return await this.applicationService.getMentorsByDirection(direction);
  }

  @RequireRoles(Role.FRAME)
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Получение заявок кадра' })
  @Get('frame-applications/:id')
  async getFrameApplicationsByFrameId(@Param('id') frameId: number) {
    return await this.applicationService.getFrameApplicationsByFrameId(frameId);
  }

  @RequireRoles(Role.FRAME)
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Получение всех заявок' })
  @Get('frame-applications')
  async getFrameApplications() {
    return await this.applicationService.getFrameApplications();
  }

  @Get('frame-application/:id')
  async getFrameApplicationById(@Param('id') applicationId: number) {
    return await this.applicationService.getFrameApplicationById(applicationId);
  }

  @Delete('frame-application/:id')
  async deleteFrameApplication(@Param('id') applicationId: number) {
    await this.applicationService.deleteFrameApplication(applicationId);
  }

  @Put('frame-application/:id')
  async updateFrameApplication(@Body() application: IFrameApplication) {
    await this.applicationService.updateFrameApplication(application);
  }

  @Put('frame-application/:application_id/submit/:trainee_id')
  async submitTraineeRespond(
    @Param('application_id', ParseIntPipe) applicationId: number,
    @Param('trainee_id', ParseIntPipe) traineeId: number,
  ) {
    await this.applicationService.submitTraineeRespond(
      applicationId,
      traineeId,
    );
  }

  @Put('frame-application/:application_id/submit')
  async submitCuratorRespond(
    @Param('application_id', ParseIntPipe) applicationId: number,
    @Query('status') status: FrameApplicationStatus,
  ) {
    await this.applicationService.submitCuratorRespond(applicationId, status);
  }

  @Get('frame-application/:id/trainees')
  async getTraineesByApplicationId(
    @Param('id', ParseIntPipe) applicationId: number,
  ) {
    return await this.applicationService.getTraineesByApplicationId(
      applicationId,
    );
  }
}
