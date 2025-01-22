import { CreateInventoryInput } from './create-inventory.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInventoryInput extends PartialType(CreateInventoryInput) {
  @Field(() => Int)
  id: number;
}
