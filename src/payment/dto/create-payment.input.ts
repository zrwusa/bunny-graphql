import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
