import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

@ApiTags('Users')
export class CreateUserDto {

  @ApiProperty({ description: 'User login', example: 'admin' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ description: 'User password', example: 'admin' })
  @IsString()
  @IsNotEmpty()
  password: string;
}