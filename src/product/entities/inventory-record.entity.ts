import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { InventoryType } from '../../common/enums';
import { Order } from '../../order/entities/order.entity';
import { ProductVariant } from './product-variant.entity';

registerEnumType(InventoryType, {
  name: 'InventoryType',
});

@Entity({ name: 'inventory_records' })
@ObjectType()
export class InventoryRecord extends BaseEntity {
  @Field(() => ProductVariant)
  @ManyToOne(() => ProductVariant, (variant) => variant.inventories)
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;

  @Field(() => Int)
  @Column({ name: 'change_quantity', type: 'int' })
  changeQuantity: number; // The positive number indicates the warehouse, the negative number indicates the warehouse out

  @Field(() => InventoryType)
  @Column({ type: 'enum', enum: InventoryType })
  type: InventoryType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  reason?: string; // Extra description, such as order number, supplier, etc.

  @Field(() => Order, { nullable: true })
  @ManyToOne(() => Order, { nullable: true }) // Related orders only when leaving the warehouse
  @JoinColumn({ name: 'order_id' })
  order?: Order;
}
