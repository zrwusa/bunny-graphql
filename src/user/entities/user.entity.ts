import { Field, ObjectType } from '@nestjs/graphql';
import { UserSetting } from './user-setting.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { EmailField, UsernameField } from '../../common';
import { Order } from '../../order/entities/order.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { UserProfile } from './user-profile.entity';
import { UserAddress } from './user-address.entity';
import { UserPaymentMethod } from './user-payment-method.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User extends BaseEntity {
  @OneToOne(() => UserSetting)
  @JoinColumn()
  @Field({ nullable: true })
  settings?: UserSetting;

  @OneToOne(() => UserProfile, (profile) => profile.user, { cascade: true })
  profile: UserProfile;

  @OneToMany(() => UserAddress, (address) => address.user, { cascade: true })
  addresses: UserAddress[];

  @OneToMany(() => UserPaymentMethod, (payment) => payment.user, {
    cascade: true,
  })
  paymentMethods: UserPaymentMethod[];

  @OneToMany(() => Order, (order) => order.user)
  @Field(() => [Order])
  orders: Order[];

  @Column()
  @UsernameField()
  @Field()
  username: string;

  @Column()
  @EmailField()
  @Field()
  email!: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ name: 'oauth_id', unique: true, nullable: true })
  @Field({ nullable: true })
  oauthId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  provider: string;
}
