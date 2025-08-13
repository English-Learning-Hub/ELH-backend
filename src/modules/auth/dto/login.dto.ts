import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email of the user',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password123',
    description: 'The password of the user',
    required: true,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
