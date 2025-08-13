import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class CreateUpdateResponseDto {
  @ApiProperty({
    description: 'Id of the user',
    type: String,
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Email of the user',
    type: String,
  })
  @Expose()
  email: string;
}

@Exclude()
export class BaseDtoRespond {
  @ApiProperty({
    description: 'Id of the news event',
    type: Number,
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Created date',
    type: Date,
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Last updated date',
    type: Date,
  })
  @Expose()
  updatedAt: Date;

  @ApiProperty({
    description: 'Last updated date',
    type: Date,
  })
  @Expose()
  deletedAt: Date;

  @ApiProperty({
    description: 'Created by user info',
    type: CreateUpdateResponseDto,
  })
  @Expose()
  @Type(() => CreateUpdateResponseDto)
  createdBy: CreateUpdateResponseDto;

  @ApiProperty({
    description: 'Updated by user info',
    type: CreateUpdateResponseDto,
  })
  @Expose()
  @Type(() => CreateUpdateResponseDto)
  updatedBy: CreateUpdateResponseDto;
}
