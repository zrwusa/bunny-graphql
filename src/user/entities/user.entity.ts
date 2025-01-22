import { Field, ObjectType } from '@nestjs/graphql';
import { UserSetting } from './user-setting.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { EmailField, UsernameField } from '../../common';
import { Post } from '../../post/entities/post.entity';
import { Order } from '../../order/entities/order.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'user' })
@ObjectType()
export class User extends BaseEntity {
  @OneToOne(() => UserSetting)
  @JoinColumn()
  @Field({ nullable: true })
  settings?: UserSetting;

  @OneToMany(() => Post, (post) => post.user)
  @Field(() => [Post])
  posts: Post[];

  @OneToMany(() => Order, (order) => order.user)
  @Field(() => [Order])
  orders: Order[];

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

  @Column({ name: 'oauth_id', unique: true, nullable: true })
  @Field({ nullable: true })
  oauthId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  provider: string;
}
