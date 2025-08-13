import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsIn,
  IsBoolean,
} from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({
    description: 'The title of the lesson',
    type: String,
    example: 'The quick brown fox jumps over the lazy dog.',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the lesson',
    type: String,
    example: 'The quick brown fox jumps over the lazy dog.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The content of the lesson',
    type: String,
    example: 'The quick brown fox jumps over the lazy dog.',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The type of the lesson',
    type: String,
    example: 'writing',
  })
  @IsOptional()
  @IsIn(['writing', 'grammar', 'vocabulary', 'quiz', 'speaking', 'reading'])
  type?: string;

  @ApiProperty({
    description: 'The level of the lesson',
    type: String,
    example: 'beginner',
  })
  @IsOptional()
  @IsIn(['beginner', 'intermediate', 'advanced'])
  level?: string;

  @ApiProperty({
    description: 'The tags of the lesson',
    type: [String],
    example: ['tag1', 'tag2'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({
    description: 'The image url of the lesson',
    type: String,
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'The audio url of the lesson',
    type: String,
    example: 'https://example.com/audio.mp3',
  })
  @IsOptional()
  @IsString()
  audioUrl?: string;

  @ApiProperty({
    description: 'The isPublished of the lesson',
    type: Boolean,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
