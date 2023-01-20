import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
export class CreateUserDto {
  @ApiProperty({ description: 'Content of post', example: 'this is test' })
  content: string;

  @ApiProperty({ description: 'Title of post', example: 'Test' })
  title: string;
}