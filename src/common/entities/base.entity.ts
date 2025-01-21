import { BeforeInsert, PrimaryColumn } from 'typeorm';
import { CreatedAtField, IdField, UpdatedAtField } from '../index';
import { Field } from '@nestjs/graphql';
import { generateUuNumId } from '../../utils';

export abstract class BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  @IdField() // Generalize the id field
  @Field() // GraphQL requires this Field decorator to be used alone
  id!: string;

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
