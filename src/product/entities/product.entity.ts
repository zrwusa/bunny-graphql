import { Field, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { generateUuNumId } from '../../utils';
import { CreatedAtField, IdField, UpdatedAtField } from '../../common';

@ObjectType()
@Entity({ name: 'product' })
export class Product {
  @PrimaryColumn({ type: 'bigint' })
  @IdField() // Generalize the id field
  @Field() // GraphQL requires this Field decorator to be used alone
  id!: string;

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

  @CreatedAtField()
  createdAt!: Date;

  @UpdatedAtField()
  updatedAt!: Date;

  // Use the BeforeInsert decorator to ensure execution before inserting data
  @BeforeInsert()
  async setId() {
    this.id = generateUuNumId();
  }
}
