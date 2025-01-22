import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { PaymentMethod, PaymentStatus } from '../../common/enums';
import { BaseEntity } from '../../common/entities/base.entity';

registerEnumType(PaymentMethod, { name: 'PaymentMethod' });
registerEnumType(PaymentStatus, { name: 'PaymentStatus' });

@ObjectType()
@Entity('payments')
export class Payment extends BaseEntity {
  @ManyToOne(() => Order, { eager: true })
  @JoinColumn({ name: 'order_id' })
  @Field(() => Order)
  order: Order;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.Pending,
  })
  @Field(() => PaymentStatus)
  status: PaymentStatus;

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
  })
  @Field(() => PaymentMethod)
  paymentMethod: PaymentMethod;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field(() => Float)
  amount: number;

  @Column({ name: 'payment_time', type: 'timestamp', nullable: true })
  @Field(() => Date, { nullable: true })
  paymentTime: Date;
}
