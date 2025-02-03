import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { PaymentMethod } from '../../common/enums';

registerEnumType(PaymentMethod, { name: 'PaymentMethod' });

@ObjectType()
@Entity({ name: 'user_payment_methods' })
export class UserPaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.paymentMethods, { onDelete: 'CASCADE' })
  user: User;

  @Field()
  @Column({ type: 'enum', enum: PaymentMethod })
  paymentType: PaymentMethod;

  @Field()
  @Column()
  maskedCardNumber: string; // Only store the card number after the mask

  @Field({ nullable: true })
  @Column({ nullable: true })
  cardExpiry: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  provider: string;
}
