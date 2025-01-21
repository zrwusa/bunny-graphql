import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../product/entities/product.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@ObjectType()
@Entity('order_products')
export class OrderProducts extends BaseEntity {
  @Field(() => Int)
  @Column()
  quantity: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.products, { onDelete: 'CASCADE' })
  order: Order;

  @Field(() => Product)
  @ManyToOne(() => Product, { eager: true })
  product: Product;
}
