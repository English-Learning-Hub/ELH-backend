import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class GenerateExerciseDto {
  @ApiProperty({
    description: 'The content of the text to generate the exercise from.',
    type: String,
    example: 'The quick brown fox jumps over the lazy dog.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'The type of the exercise to generate.',
    type: String,
    example: 'quiz',
    required: false,
  })
  @IsOptional()
  @IsIn(['quiz', 'fill-blank', 'vocabulary', 'grammar'])
  type?: string;

  @ApiProperty({
    description: 'The level of the exercise to generate.',
    type: String,
    example: 'beginner',
    required: false,
  })
  @IsOptional()
  @IsIn(['beginner', 'intermediate', 'advanced'])
  level?: string;
}
