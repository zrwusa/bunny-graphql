import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entities/base.entity';
import { Product } from './product.entity';
import { Inventory } from './inventory.entity';
import { ProductPrice } from './product-price.entity';
import { ProductReview } from './product-review.entity';

@ObjectType()
@Entity('product_variants')
@Unique(['sku']) // SKU requires unique
export class ProductVariant extends BaseEntity {
  @Field()
  @Column({ type: 'varchar', length: 50, unique: true })
  sku!: string; // Only SKU (Inventory Unit）

  @Field()
  @Column({ type: 'varchar', length: 50 })
  color!: string; // color

  @Field()
  @Column({ type: 'varchar', length: 20 })
  size!: string; // size

  @Field(() => [ProductPrice])
  @OneToMany(() => ProductPrice, (productPrice) => productPrice.variant, {})
  prices!: ProductPrice[]; // prices

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product!: Product; // Related Product

  @Field(() => [Inventory])
  @OneToMany(() => Inventory, (inventory) => inventory.variant, { eager: true })
  inventories!: Inventory[]; // Associated inventory

  @Field(() => [ProductReview])
  @OneToMany(() => ProductReview, (review) => review.variant, { lazy: true })
  reviews!: Promise<ProductReview[]>; // Product Reviews
}
