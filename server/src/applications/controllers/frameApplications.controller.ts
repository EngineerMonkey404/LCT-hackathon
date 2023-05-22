import {
  Body,
  Controller,
  Delete,
  Get,
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
import { FrameApplicationStatus } from '../models/frame/frameApplicationStatus.enum';

@ApiTags('Заявки кадра')
@Controller('applications')
export class FrameApplicationsController {
  constructor(private readonly applicationService: FrameApplicationsService) {}

  @RequireRoles(Role.FRAME)
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Создание заявки' })
  @ApiBody({ type: CreateFrameApplicationDto })
  @Post('createFrameApplication')
  async createApplication(@Body() application: CreateFrameApplicationDto) {
    return await this.applicationService.createApplication(application);
  }

  @RequireRoles(Role.FRAME)
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Получение заявок кадра' })
  @Get('getFrameApplications/:id')
  async getFrameApplicationsByFrameId(@Param('id') frameId: number) {
    return await this.applicationService.getFrameApplicationsByFrameId(frameId);
  }

  @RequireRoles(Role.FRAME)
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Получение заявок кадра' })
  @Get('getFrameApplications')
  async getFrameApplications() {
    return await this.applicationService.getFrameApplications();
  }

  @Get('getFrameApplicationById/:id')
  async getFrameApplicationById(@Param('id') applicationId: number) {
    return await this.applicationService.getFrameApplicationById(applicationId);
  }

  @Delete('deleteFrameApplication/:id')
  async deleteFrameApplication(@Param('id') applicationId: number) {
    await this.applicationService.deleteFrameApplication(applicationId);
  }

  @Get('getTraineesByFrameApplication/:id')
  async getTraineesByFrameApplicationId(@Param('id') applicationId: number) {
    return await this.applicationService.getTraineesByFrameApplicationId(
      applicationId,
    );
  }

  @Put('updateFrameApplication/:id')
  async updateFrameApplication(@Body() application: IFrameApplication) {
    await this.applicationService.updateFrameApplication(application);
  }

  @Put('submitTraineeRespond/:application_id/:trainee_id')
  async submitTraineeRespond(
    @Param('application_id', ParseIntPipe) applicationId: number,
    @Param('trainee_id', ParseIntPipe) traineeId: number,
  ) {
    await this.applicationService.submitTraineeRespond(
      applicationId,
      traineeId,
    );
  }

  @Put('submitCuratorRespond/:application_id/:curator_id')
  async submitCuratorRespond(
    @Param('application_id', ParseIntPipe) applicationId: number,
    @Param('curator_id', ParseIntPipe) traineeId: number,
    @Query('status') status: FrameApplicationStatus,
  ) {
    await this.applicationService.submitCuratorRespond(
      applicationId,
      traineeId,
      status,
    );
  }
}
