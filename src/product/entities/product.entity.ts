import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Inventory } from './inventory.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'product' })
@ObjectType()
export class Product extends BaseEntity {
  @OneToOne(() => Inventory)
  @JoinColumn()
  @Field({ nullable: true })
  inventory?: Inventory;

  @Column({ nullable: true })
  @Field({ nullable: true })
  brand: string;

  @Column()
  @Field()
  name!: string;

  @Column({ type: 'float', nullable: true })
  @Field({ nullable: true })
  price?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;
}
