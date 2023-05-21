import { ApiProperty } from '@nestjs/swagger';

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
  workExperience: string[];
}
