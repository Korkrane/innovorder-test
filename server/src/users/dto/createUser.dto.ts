import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
export class CreateUserDto {

  @ApiProperty({ description: 'User login', example: 'admin' })
  login: string;

  @ApiProperty({ description: 'User password', example: 'admin' })
  password: string;
}