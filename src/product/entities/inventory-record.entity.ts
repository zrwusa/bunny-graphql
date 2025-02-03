import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Product } from './product.entity';
import { InventoryType } from '../../common/enums';
import { Order } from '../../order/entities/order.entity';

registerEnumType(InventoryType, {
  name: 'InventoryType',
});

@Entity({ name: 'inventory_records' })
@ObjectType()
export class InventoryRecord extends BaseEntity {
  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.inventoryRecords)
  product: Product;

  @Field(() => Int)
  @Column({ type: 'int' })
  quantity: number; // The positive number indicates the warehouse, the negative number indicates the warehouse out

  @Field(() => InventoryType)
  @Column({ type: 'enum', enum: InventoryType })
  type: InventoryType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  reason?: string; // Extra description, such as order number, supplier, etc.

  @Field(() => Order, { nullable: true })
  @ManyToOne(() => Order, { nullable: true }) // Related orders only when leaving the warehouse
  order?: Order;
}
