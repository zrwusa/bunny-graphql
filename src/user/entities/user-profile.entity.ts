import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Gender } from '../../common/enums';

registerEnumType(Gender, { name: 'Gender' });

@ObjectType()
@Entity({ name: 'user_profiles' })
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatarUrl: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  bio: string;

  @Field({ nullable: true })
  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Field({ nullable: true })
  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;
}
