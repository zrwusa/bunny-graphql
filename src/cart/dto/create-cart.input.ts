import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCartInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
