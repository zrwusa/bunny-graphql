import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class SearchProductDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  description?: object;

  @Field()
  category: string;

  @Field()
  brand: string;

  @Field(() => [String], { nullable: true })
  variants?: string[];
}
