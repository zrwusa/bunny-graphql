import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InventoryService } from './inventory.service';
import { InventoryRecord } from './entities/inventory-record.entity';
// import { CreateInventoryInput } from './dto/create-inventory.input';
// import { UpdateInventoryInput } from './dto/update-inventory.input';

@Resolver(() => InventoryRecord)
export class InventoryRecordResolver {
  constructor(private readonly inventoryService: InventoryService) {}

  // @Mutation(() => Inventory)
  // createInventory(@Args('createInventoryInput') createInventoryInput: CreateInventoryInput) {
  //   return this.inventoryService.create(createInventoryInput);
  // }

  @Query(() => [InventoryRecord], { name: 'inventoryRecords' })
  findAll() {
    return this.inventoryService.findAll();
  }

  @Query(() => InventoryRecord, { name: 'inventoryRecord' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.inventoryService.findOne(id);
  }

  // @Mutation(() => Inventory)
  // updateInventory(@Args('updateInventoryInput') updateInventoryInput: UpdateInventoryInput) {
  //   return this.inventoryService.update(updateInventoryInput.id, updateInventoryInput);
  // }

  @Mutation(() => InventoryRecord)
  removeInventory(@Args('id', { type: () => Int }) id: number) {
    return this.inventoryService.remove(id);
  }
}
