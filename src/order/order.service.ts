import { Injectable } from '@nestjs/common';
// import { CreateOrderInput } from './dto/create-order.input';
// import { UpdateOrderInput } from './dto/update-order.input';
import { FilterOrderInput } from './dto/filter-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
// import { PaymentStatus } from '../common/enums';
// import { Inventory } from '../product/entities/inventory.entity';
// import { Payment } from '../payment/entities/payment.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    // private readonly inventoryRepository: Repository<Inventory>,
    // private readonly paymentRepository: Repository<Payment>,
  ) {}

  // create(createOrderInput: CreateOrderInput) {
  //   return 'This action adds a new order';
  // }

  // async createOrderWithPaymentAndInventory(orderData, paymentData) {
  //   const queryRunner =
  //     this.orderRepository.manager.connection.createQueryRunner();
  //
  //   await queryRunner.startTransaction();
  //   try {
  //     const order = await queryRunner.manager.save(Order, orderData);
  //
  //     await queryRunner.manager.update(
  //       Inventory,
  //       { product_id: orderData.product_id },
  //       { stock_quantity: orderData.quantity },
  //     );
  //
  //     const payment = await queryRunner.manager.save(Payment, paymentData);
  //
  //     await queryRunner.manager.update(Order, order.id, {
  //       paymentStatus: PaymentStatus.Paid,
  //     });
  //
  //     await queryRunner.commitTransaction();
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     throw error;
  //   } finally {
  //     await queryRunner.release();
  //   }
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
