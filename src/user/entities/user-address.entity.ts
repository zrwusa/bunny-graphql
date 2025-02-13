import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@ObjectType()
@Entity({ name: 'user_addresses' })
export class UserAddress extends BaseEntity {
  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field()
  @Column({ name: 'recipient_name' })
  recipientName: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column({ name: 'address_line_1' })
  addressLine1: string;

  @Field({ nullable: true })
  @Column({ name: 'address_line_2', nullable: true })
  addressLine2: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column({ name: 'postal_code' })
  postalCode: string;

  @Field()
  @Column()
  country: string;

  @Field()
  @Column({ name: 'is_default', default: false })
  isDefault: boolean;
}
