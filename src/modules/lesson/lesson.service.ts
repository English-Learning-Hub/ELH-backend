import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  async create(
    createLessonDto: CreateLessonDto,
    authorId: number,
  ): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      ...createLessonDto,
      authorId,
    });
    return this.lessonRepository.save(lesson);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ lessons: Lesson[]; total: number }> {
    const [lessons, total] = await this.lessonRepository.findAndCount({
      where: { isPublished: true },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['author'],
    });

    return { lessons, total };
  }

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({
      where: { id },
      relations: ['author', 'comments', 'comments.author'],
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    // Increment views
    await this.lessonRepository.update(id, { views: lesson.views + 1 });
    lesson.views += 1;

    return lesson;
  }

  async findByAuthor(authorId: number): Promise<Lesson[]> {
    return this.lessonRepository.find({
      where: { authorId },
      order: { createdAt: 'DESC' },
      relations: ['author'],
    });
  }

  async update(
    id: number,
    updateLessonDto: UpdateLessonDto,
    userId: number,
  ): Promise<Lesson> {
    const lesson = await this.findOne(id);

    if (lesson.authorId !== userId) {
      throw new ForbiddenException('You can only update your own lessons');
    }

    await this.lessonRepository.update(id, updateLessonDto);
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    const lesson = await this.findOne(id);

    if (lesson.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own lessons');
    }

    await this.lessonRepository.delete(id);
  }

  async like(id: number): Promise<Lesson> {
    const lesson = await this.findOne(id);
    await this.lessonRepository.update(id, { likes: lesson.likes + 1 });
    return this.findOne(id);
  }

  async search(query: string): Promise<Lesson[]> {
    return this.lessonRepository
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.author', 'author')
      .where(
        'lesson.title LIKE :query OR lesson.description LIKE :query OR lesson.content LIKE :query',
        {
          query: `%${query}%`,
        },
      )
      .andWhere('lesson.isPublished = :isPublished', { isPublished: true })
      .orderBy('lesson.createdAt', 'DESC')
      .getMany();
  }
}
