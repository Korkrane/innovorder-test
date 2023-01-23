import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
export class UpdateUserDto {
  @ApiProperty({ description: 'ID of updated user', example: '1' })
  id: number;

  @ApiProperty({ description: 'User login', example: 'admin' })
  login: string;

  @ApiProperty({ description: 'User password', example: 'admin' })
  password: string;
}