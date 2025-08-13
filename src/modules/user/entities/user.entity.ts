import { Entity, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Lesson } from '../../lesson/entities/lesson.entity';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Comment } from '../../comment/entities/comment.entity';

export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: 'student' })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Lesson, (lesson) => lesson.author)
  lessons: Lesson[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
