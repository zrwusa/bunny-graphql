import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'inventory' })
@ObjectType()
export class Inventory extends BaseEntity {
  @Column({ name: 'product_id' })
  @Field()
  productId: string;

  @Column({ name: 'stock_quantity' })
  @Field(() => Int, { description: 'Stock Quantity Description' })
  stockQuantity: number;
}
