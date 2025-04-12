import { CreateCartInput } from './create-cart.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCartInput extends PartialType(CreateCartInput) {
  @Field(() => Int)
  id: number;
}
