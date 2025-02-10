import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name!: string;

  @Field()
  brandId!: string;

  @Field()
  price!: number;

  @Field({ nullable: true })
  description: string;
}
