import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  ShippingStatus,
} from '../../common/enums';
import { Payment } from '../../payment/entities/payment.entity';

registerEnumType(OrderStatus, { name: 'OrderStatus' });
registerEnumType(PaymentStatus, { name: 'PaymentStatus' });
registerEnumType(ShippingStatus, { name: 'ShippingStatus' });
registerEnumType(PaymentMethod, { name: 'PaymentMethod' });

@Entity('orders')
@ObjectType()
export class Order extends BaseEntity {
  @ManyToOne(() => User, (user) => user.orders, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @Field(() => User)
  user: User;

  @OneToMany(() => OrderItem, (orderItems) => orderItems.order, {
    eager: true,
    cascade: true,
  })
  @Field(() => [OrderItem], { nullable: true })
  items: OrderItem[];

  @OneToMany(() => Payment, (payment) => payment.order, { cascade: true })
  @Field(() => [Payment], { nullable: true })
  payments: Payment[];

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

  @Column('decimal', { name: 'total_price', precision: 10, scale: 2 })
  @Field(() => Float)
  totalPrice: number;
}
