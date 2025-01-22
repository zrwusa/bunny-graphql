import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../product/entities/product.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('order_products')
@ObjectType()
export class OrderProducts extends BaseEntity {
  @ManyToOne(() => Order, (order) => order.products, { onDelete: 'CASCADE' })
  @Field(() => Order)
  order: Order;

  @ManyToOne(() => Product, { eager: true })
  @Field(() => Product)
  product: Product;

  @Column()
  @Field(() => Int)
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field(() => Float)
  price: number;
}
