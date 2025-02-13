import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from './user.entity';

@Entity({ name: 'user_preferences' })
@ObjectType()
export class UserPreference extends BaseEntity {
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'receive_notifications', default: false })
  @Field({ defaultValue: false })
  receiveNotifications: boolean;

  @Column({ name: 'receive_emails', default: false })
  @Field({ defaultValue: false })
  receiveEmails: boolean;
}
