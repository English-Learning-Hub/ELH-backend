import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The content of the comment',
    type: String,
    example: 'The quick brown fox jumps over the lazy dog.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
