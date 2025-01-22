import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateInventoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
