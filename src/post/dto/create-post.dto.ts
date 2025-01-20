import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostDto {
  @Field()
  userId: string;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  image: string;
}
