import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
export class UpdateUserDto {
  @ApiProperty({ description: 'ID of updated user', example: '1' })
  id: number;

  @ApiProperty({ description: 'Content of post', example: 'this test is updated' })
  content: string;

  @ApiProperty({ description: 'Title of post', example: 'Update test' })
  title: string;
}