import { Field, ObjectType } from '@nestjs/graphql';
import { UserSetting } from './user-setting.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { generateUuNumId } from '../utils';
import {
  CreatedAtField,
  EmailField,
  IdField,
  UpdatedAtField,
  UsernameField,
} from '../common';
import { Post } from './post.entity';
import { Order } from '../order/entities/order.entity';

@ObjectType()
@Entity({ name: 'user' })
export class User {
  @PrimaryColumn({ type: 'bigint' })
  @IdField() // Generalize the id field
  @Field() // GraphQL requires this Field decorator to be used alone
  id!: string;

  @Column()
  @UsernameField()
  @Field()
  username: string;

  @Column()
  @EmailField()
  @Field()
  email!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  password?: string;

  @Column({ unique: true, nullable: true })
  @Field({ nullable: true })
  oauthId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  provider: string;

  @CreatedAtField()
  createdAt!: Date;

  @UpdatedAtField()
  updatedAt!: Date;

  @OneToOne(() => UserSetting)
  @JoinColumn()
  @Field({ nullable: true })
  settings?: UserSetting;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  // Use the BeforeInsert decorator to ensure execution before inserting data
  @BeforeInsert()
  async setId() {
    this.id = generateUuNumId();
  }
}
