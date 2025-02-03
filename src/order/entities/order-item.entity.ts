import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../product/entities/product.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('order_items')
@ObjectType()
export class OrderItem extends BaseEntity {
  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @Field(() => Order)
  order: Order;

  @ManyToOne(() => Product, { eager: true, onDelete: 'CASCADE' })
  @Field(() => Product)
  product: Product;

  @Column()
  @Field(() => Int)
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field(() => Float, {
    description: 'The total price of the current quantity of products',
  })
  price: number;
}
