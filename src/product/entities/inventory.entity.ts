import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entities/base.entity';
import { ProductVariant } from './product-variant.entity';
import { Warehouse } from './warehouse.entity';

@ObjectType()
@Entity('inventories')
@Unique(['variant', 'warehouse']) // sku warehouse only
export class Inventory extends BaseEntity {
  @Field()
  @Column({ type: 'int', default: 0 })
  quantity!: number; // Current inventory quantity

  @Field(() => ProductVariant)
  @ManyToOne(() => ProductVariant, (variant) => variant.inventories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'variant_id' })
  variant!: ProductVariant; // Related product variants

  @Field(() => Warehouse)
  @ManyToOne(() => Warehouse, (warehouse) => warehouse.inventories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'warehouse_id' })
  warehouse!: Warehouse; // Related warehouse
}
