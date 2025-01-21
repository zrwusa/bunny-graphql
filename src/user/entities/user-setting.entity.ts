import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { CreatedAtField, IdField, UpdatedAtField } from '../../common';
import { generateUuNumId } from '../../utils';

@Entity({ name: 'user_settings' })
@ObjectType()
export class UserSetting {
  @PrimaryColumn({ type: 'bigint' })
  @IdField() // Generalize the id field
  @Field() // GraphQL requires this Field decorator to be used alone
  id!: string;

  @Column({ name: 'user_id' })
  @Field()
  userId: string;

  @Column({ default: false, name: 'receive_notifications' })
  @Field({ defaultValue: false })
  receiveNotifications: boolean;

  @Column({ default: false, name: 'receive_emails' })
  @Field({ defaultValue: false })
  receiveEmails: boolean;

  @CreatedAtField()
  createdAt!: Date;

  @UpdatedAtField()
  updatedAt!: Date;

  // Use the BeforeInsert decorator to ensure execution before inserting data
  @BeforeInsert()
  async setId() {
    this.id = generateUuNumId();
  }
}
