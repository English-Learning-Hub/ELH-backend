import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    lessonId: number,
    authorId: number,
  ): Promise<Comment> {
    const author = await this.userRepository.findOne({
      where: { id: authorId },
      relations: ['comments'],
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }
    const comment = this.commentRepository.create({
      ...createCommentDto,
      lessonId,
    });
    return this.commentRepository.save(comment);
  }

  async findByLesson(lessonId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { lessonId },
      order: { createdAt: 'DESC' },
      relations: ['author'],
    });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author', 'lesson'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async update(id: number, content: string, userId: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment?.author.id !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    await this.commentRepository.update(id, { content });
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment?.author.id !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    await this.commentRepository.delete(id);
  }

  async like(id: number): Promise<Comment> {
    const comment = await this.findOne(id);
    await this.commentRepository.update(id, { likes: comment.likes + 1 });
    return this.findOne(id);
  }
}
