import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'user_settings' })
@ObjectType()
export class UserSetting extends BaseEntity {
  @Column({ name: 'user_id' })
  @Field()
  userId: string;

  @Column({ name: 'receive_notifications', default: false })
  @Field({ defaultValue: false })
  receiveNotifications: boolean;

  @Column({ name: 'receive_emails', default: false })
  @Field({ defaultValue: false })
  receiveEmails: boolean;
}
