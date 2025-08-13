import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Lesson } from '../../lesson/entities/lesson.entity';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('comments')
export class Comment extends BaseEntity {
  @Column('text')
  content: string;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.comments, { eager: true })
  @JoinColumn({ name: 'lessonId' })
  lesson: Lesson;

  @Column()
  lessonId: number;
}
