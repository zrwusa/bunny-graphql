import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'user_settings' })
@ObjectType()
export class UserSetting {
  @PrimaryColumn({ name: 'user_id' })
  @Field()
  userId: string;

  @Column({ default: false, name: 'receive_notifications' })
  @Field({ defaultValue: false })
  receiveNotifications: boolean;

  @Column({ default: false, name: 'receive_emails' })
  @Field({ defaultValue: false })
  receiveEmails: boolean;
}
