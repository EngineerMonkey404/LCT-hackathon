import { ApiProperty } from '@nestjs/swagger';
import { WorkExperience } from './workExperience.model';
import { Direction } from '../../../auth/models/direction.enum';

export class CreateFrameApplicationDto {
  @ApiProperty()
  frameId: number;

  @ApiProperty()
  position: string;

  @ApiProperty()
  organization: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  workExperience: WorkExperience[];

  @ApiProperty()
  mentorId: number;

  @ApiProperty()
  direction: Direction;
}
