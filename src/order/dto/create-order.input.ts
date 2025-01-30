import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field({ description: 'User Id' })
  userId: string;

  @Field(() => [OrderProductInput])
  products: OrderProductInput[];
}

@InputType()
export class OrderProductInput {
  @Field(() => String, { description: 'Product Ids' })
  productId: string;

  @Field(() => Int, { description: 'Quantity of the product(s)' })
  quantity: number;
}
