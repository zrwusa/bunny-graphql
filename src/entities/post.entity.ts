import { Field, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { generateUuNumId } from '../utils';
import { CreatedAtField, IdField, UpdatedAtField } from '../common';
import { User } from './user.entity';

@ObjectType()
@Entity({ name: 'post' })
export class Post {
  @PrimaryColumn({ type: 'bigint' })
  @IdField() // Generalize the id field
  @Field() // GraphQL requires this Field decorator to be used alone
  id!: string;

  @Column()
  @Field()
  title!: string;

  @Column()
  @Field()
  content!: string;

  @Column({ type: 'float', nullable: true })
  @Field({ nullable: true })
  price?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  image: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

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
