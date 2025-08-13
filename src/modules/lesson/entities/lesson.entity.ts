import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { BaseEntity } from '../../../common/entities/base.entity';

export enum LessonType {
  WRITING = 'writing',
  GRAMMAR = 'grammar',
  VOCABULARY = 'vocabulary',
  QUIZ = 'quiz',
  SPEAKING = 'speaking',
  READING = 'reading',
}

export enum LessonLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

@Entity('lessons')
export class Lesson extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  content: string;

  @Column({ default: 'writing' })
  type: string;

  @Column({ default: 'beginner' })
  level: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  audioUrl: string;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: true })
  isPublished: boolean;

  @ManyToOne(() => User, (user) => user.lessons, { eager: true })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column()
  authorId: number;

  @OneToMany(() => Comment, (comment) => comment.lesson)
  comments: Comment[];
}
