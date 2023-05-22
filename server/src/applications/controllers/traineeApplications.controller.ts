import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiTags('Заявки')
@Controller('applications')
export class TraineeApplicationsController {}
