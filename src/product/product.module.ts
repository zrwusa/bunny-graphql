import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductResolver } from './product.resolver';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { InventoryRecord } from './entities/inventory-record.entity';
import { InventoryRecordResolver } from './inventory-record.resolver';
import { InventoryService } from './inventory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, InventoryRecord])], // The core function of TypeOrmModule.forFeature is to convert the specified entities into an Injectable Provider and register them into NestJS's dependency injection container. These converted Repositories can be directly injected into your services without the need to manually add them to the providers array.
  providers: [
    ProductService,
    ProductResolver,
    InventoryService,
    InventoryRecordResolver,
  ],
})
export class ProductModule {}
