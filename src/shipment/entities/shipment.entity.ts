import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Carrier, ShipmentStatus } from '../../common/enums';
import { BaseEntity } from '../../common/entities/base.entity';

registerEnumType(ShipmentStatus, { name: 'ShipmentStatus' });
registerEnumType(Carrier, { name: 'Carrier' });

@Entity('shipments')
@ObjectType()
export class Shipment extends BaseEntity {
  @ManyToOne(() => Order, { eager: true })
  @JoinColumn({ name: 'order_id' })
  @Field(() => Order)
  order: Order;

  @Column({
    type: 'enum',
    enum: ShipmentStatus,
    default: ShipmentStatus.Pending,
  })
  @Field(() => ShipmentStatus)
  status: ShipmentStatus;

  @Column({
    type: 'enum',
    enum: Carrier,
  })
  @Field(() => Carrier)
  carrier: Carrier;

  @Column({ name: 'tracking_number', unique: true, nullable: true })
  @Field({ nullable: true })
  trackingNumber: string;

  @Column({ name: 'estimated_delivery', type: 'timestamp', nullable: true })
  @Field(() => Date, { nullable: true })
  estimatedDelivery: Date;

  @Column({ name: 'shipped_at', type: 'timestamp', nullable: true })
  @Field(() => Date, { nullable: true })
  shippedAt: Date;
}
