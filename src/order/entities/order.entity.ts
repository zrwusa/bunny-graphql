import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrderProducts } from './order-products.entity';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  ShippingStatus,
} from '../../common/enums';

registerEnumType(OrderStatus, { name: 'OrderStatus' });
registerEnumType(PaymentStatus, { name: 'PaymentStatus' });
registerEnumType(ShippingStatus, { name: 'ShippingStatus' });
registerEnumType(PaymentMethod, { name: 'PaymentMethod' });

@ObjectType()
@Entity('order')
export class Order extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  @Field(() => [OrderProducts], { nullable: true })
  @OneToMany(() => OrderProducts, (orderProducts) => orderProducts.order, {
    cascade: true,
  })
  products: OrderProducts[];

  @Field(() => Float)
  @Column('decimal', { name: 'total_amount', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Pending,
  })
  @Field(() => OrderStatus)
  status: OrderStatus;

  @Column({
    name: 'payment_status',
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.Pending,
  })
  @Field(() => PaymentStatus)
  paymentStatus: PaymentStatus;

  @Column({
    name: 'shipping_status',
    type: 'enum',
    enum: ShippingStatus,
    default: ShippingStatus.Pending,
  })
  @Field(() => ShippingStatus)
  shippingStatus: ShippingStatus;

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CreditCard,
  })
  @Field(() => PaymentMethod)
  paymentMethod: PaymentMethod;
}
