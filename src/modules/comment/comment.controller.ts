import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserReq } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiOperationDecorator } from 'src/common/decorators/api-operation.decorator';
import { Roles } from 'src/common/decorators/role.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { User, UserRole } from '../user/entities/user.entity';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperationDecorator({
    summary: 'Create a new comment',
    description: 'Create a new comment',
  })
  @ApiBearerAuth()
  @Post('lesson/:lessonId')
  create(
    @Param('lessonId', ParseIntPipe) lessonId: number,
    @Body() createCommentDto: CreateCommentDto,
    @UserReq() user: User,
  ) {
    return this.commentService.create(createCommentDto, lessonId, user.id);
  }

  @ApiOperationDecorator({
    summary: 'Find all comments by lesson',
    description: 'Find all comments by lesson',
  })
  @Public()
  @Get('lesson/:lessonId')
  @UseGuards(RolesGuard)
  findByLesson(@Param('lessonId', ParseIntPipe) lessonId: number) {
    return this.commentService.findByLesson(lessonId);
  }

  @Get(':id')
  @ApiOperationDecorator({
    summary: 'Find one comment',
    description: 'Find one comment',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperationDecorator({
    summary: 'Update a comment',
    description: 'Update a comment',
  })
  @ApiBearerAuth()
  @Roles(UserRole.STUDENT, UserRole.TEACHER)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: { content: string },
    @UserReq() user: User,
  ) {
    return this.commentService.update(id, updateData.content, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperationDecorator({
    summary: 'Delete a comment',
    description: 'Delete a comment',
  })
  @Roles(UserRole.STUDENT, UserRole.TEACHER)
  remove(@Param('id', ParseIntPipe) id: number, @UserReq() user: User) {
    return this.commentService.remove(id, user.id);
  }

  @ApiOperationDecorator({
    summary: 'Like a comment',
    description: 'Like a comment',
  })
  @ApiBearerAuth()
  @Post(':id/like')
  like(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.like(id);
  }
}
