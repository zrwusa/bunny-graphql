import { Injectable } from '@nestjs/common';
// import { CreateOrderInput } from './dto/create-order.input';
// import { UpdateOrderInput } from './dto/update-order.input';
import { FilterOrderInput } from './dto/filter-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // create(createOrderInput: CreateOrderInput) {
  //   return 'This action adds a new order';
  // }

  findAll({ page, pageSize }: FilterOrderInput) {
    return this.orderRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['products'],
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }

  // update(id: number, updateOrderInput: UpdateOrderInput) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
