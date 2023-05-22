import { ApiProperty } from '@nestjs/swagger';

export class CreateCandidateApplicationDto {
  @ApiProperty()
  candidateId: number;

  @ApiProperty()
  direction: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  nationality: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  experience: boolean;

  @ApiProperty()
  position: string[];
}
