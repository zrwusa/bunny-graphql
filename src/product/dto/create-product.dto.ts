import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductDto {
  @Field()
  name!: string;

  @Field()
  brand!: string;

  @Field()
  price!: number;

  @Field({ nullable: true })
  description: string;
}
