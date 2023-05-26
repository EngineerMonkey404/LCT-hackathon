import { ApiProperty } from '@nestjs/swagger';

export type AnswerVariant = 'a' | 'b' | 'c' | 'd';

export class IQuestion {
  @ApiProperty()
  question: string;
  @ApiProperty()
  variantA: string;
  @ApiProperty()
  variantB: string;
  @ApiProperty()
  variantC: string;
  @ApiProperty()
  variantD: string;
  @ApiProperty()
  rightAnswer: AnswerVariant;
}

export class IAnswer {
  @ApiProperty()
  questionId: number;
  @ApiProperty()
  answer: AnswerVariant;
}
