import { Injectable } from '@nestjs/common';
// import { CreateInventoryInput } from './dto/create-inventory.input';
// import { UpdateInventoryInput } from './dto/update-inventory.input';

@Injectable()
export class InventoryService {
  // create(createInventoryInput: CreateInventoryInput) {
  //   return 'This action adds a new inventory';
  // }

  findAll() {
    return `This action returns all inventory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventory`;
  }

  // update(id: number, updateInventoryInput: UpdateInventoryInput) {
  //   return `This action updates a #${id} inventory`;
  // }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}
