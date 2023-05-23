import { ApiProperty } from '@nestjs/swagger';
import { Position } from './candidateApplication.interface';

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
  position: Position[];
}
