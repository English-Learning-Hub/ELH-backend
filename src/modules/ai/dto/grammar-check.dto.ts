import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GrammarCheckDto {
  @ApiProperty({
    description: 'The text to check the grammar of.',
    type: String,
    example: 'The quick brown fox jumps over the lazy dog.',
  })
  @IsString()
  @IsNotEmpty()
  text: string;
}

