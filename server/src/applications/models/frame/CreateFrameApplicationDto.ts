import { ApiProperty } from '@nestjs/swagger';
import { WorkExperience } from './workExperience.model';

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
}
