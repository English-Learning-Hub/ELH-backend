import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { UserReq } from 'src/common/decorators/current-user.decorator';
import { ApiOperationDecorator } from 'src/common/decorators/api-operation.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/role.decorator';
import { User, UserRole } from '../user//entities/user.entity';

@Controller('lessons')
@ApiTags('Lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @ApiOperationDecorator({
    summary: 'Create a new lesson',
    description: 'Create a new lesson',
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() createLessonDto: CreateLessonDto, @UserReq() user: User) {
    return this.lessonService.create(createLessonDto, user.id);
  }

  @ApiOperationDecorator({
    summary: 'Get all lessons',
    description: 'Get all lessons',
  })
  @Public()
  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.lessonService.findAll(+page, +limit);
  }

  @ApiOperationDecorator({
    summary: 'Search lessons',
    description: 'Search lessons',
  })
  @Public()
  @Get('search')
  search(@Query('q') query: string) {
    return this.lessonService.search(query);
  }

  @ApiOperationDecorator({
    summary: 'Get my lessons',
    description: 'Get my lessons',
  })
  @ApiBearerAuth()
  @Get('my-lessons')
  findMyLessons(@UserReq() user: User) {
    return this.lessonService.findByAuthor(user.id);
  }

  @ApiOperationDecorator({
    summary: 'Get one lesson',
    description: 'Get one lesson',
  })
  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonService.findOne(id);
  }

  @ApiOperationDecorator({
    summary: 'Update a lesson',
    description: 'Update a lesson',
  })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLessonDto: UpdateLessonDto,
    @UserReq() user: User,
  ) {
    return this.lessonService.update(id, updateLessonDto, user.id);
  }

  @ApiOperationDecorator({
    summary: 'Delete a lesson',
    description: 'Delete a lesson',
  })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @UserReq() user: User) {
    return this.lessonService.remove(id, user.id);
  }

  @ApiOperationDecorator({
    summary: 'Like a lesson',
    description: 'Like a lesson',
  })
  @ApiBearerAuth()
  @Post(':id/like')
  like(@Param('id', ParseIntPipe) id: number) {
    return this.lessonService.like(id);
  }
}
