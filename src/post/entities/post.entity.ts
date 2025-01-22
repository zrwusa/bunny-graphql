import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'post' })
@ObjectType()
export class Post extends BaseEntity {
  @ManyToOne(() => User, (user) => user.posts)
  @Field(() => User)
  user: User;

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
}
