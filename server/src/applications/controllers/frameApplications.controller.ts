import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FrameApplicationsService } from '../services/frameApplications.service';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateFrameApplicationDto } from '../models/frame/CreateFrameApplicationDto';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { Role } from '../../auth/models/role.enum';
import { RequireRoles } from '../../auth/guards/roles.decorator';

@ApiTags('Заявки')
@Controller('applications')
export class FrameApplicationsController {
  constructor(private readonly applicationService: FrameApplicationsService) {}

  @RequireRoles(Role.FRAME)
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Создание заявки' })
  @ApiBody({ type: CreateFrameApplicationDto })
  @Post('createApplication')
  async createApplication(@Body() application: CreateFrameApplicationDto) {
    return await this.applicationService.createApplication(application);
  }

  @RequireRoles(Role.FRAME)
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Получение заявок по id кадра' })
  @ApiBody({ type: CreateFrameApplicationDto })
  @Get('getFrameApplications/:id')
  async getFrameApplications(@Param('id') frameId: number) {
    return await this.applicationService.getFrameApplications(frameId);
  }
}
