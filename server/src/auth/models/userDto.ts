import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  secondName: string;

  @ApiProperty()
  thirdName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
