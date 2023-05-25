import { ApiProperty } from '@nestjs/swagger';

export interface Question {
  question: string;
  variantA: string;
  variantB: string;
  variantC: string;
  variantD: string;
  rightAnswer: string;
}

export class CreateTestDto {
  @ApiProperty()
  applicationId: number;

  @ApiProperty()
  questions: Question[];
}
