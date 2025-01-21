import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrderItems } from './order-items.entity';
import { User } from '../../entities/user.entity';
import { BaseEntity } from '../../common/base.entity';

export enum OrderStatus {
  Pending = 'Pending',
  Paid = 'Paid',
  AwaitingShipment = 'Awaiting Shipment',
  Shipped = 'Shipped',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Refunding = 'Refunding',
  Refunded = 'Refunded',
  Returning = 'Returning',
  Returned = 'Returned',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });

@ObjectType()
@Entity('order')
export class Order extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  @Field(() => [OrderItems], { nullable: true })
  @OneToMany(() => OrderItems, (orderItem) => orderItem.order, {
    cascade: true,
  })
  items: OrderItems[];

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
}
