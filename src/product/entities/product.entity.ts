import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { InventoryRecord } from './inventory.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'products' })
@ObjectType()
export class Product extends BaseEntity {
  @OneToMany(() => InventoryRecord, (inventory) => inventory.product)
  inventoryRecords: InventoryRecord[];

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
