import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { CreateOrderInput } from './dto/create-order.input';
// import { UpdateOrderInput } from './dto/update-order.input';
import { FilterOrderInput } from './dto/filter-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import { OrderProduct } from './entities/order-product.entity';
import { InventoryRecord } from '../product/entities/inventory.entity';
import { InventoryType, OrderStatus } from '../common/enums';
// import { PaymentStatus } from '../common/enums';
// import { Inventory } from '../product/entities/inventory.entity';
// import { Payment } from '../payment/entities/payment.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(OrderProduct)
    private readonly orderProductsRepository: Repository<OrderProduct>,
    private readonly dataSource: DataSource,
    // private readonly inventoryRepository: Repository<Inventory>,
    // private readonly paymentRepository: Repository<Payment>,
  ) {}

  async create(createOrderInput: CreateOrderInput) {
    const { userId } = createOrderInput;
    return this.dataSource.transaction(async (manager) => {
      const user = await manager.findOne(User, { where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');

      let totalAmount = 0;
      const orderProducts: OrderProduct[] = [];
      const inventoryRecords: InventoryRecord[] = [];
      // Create an order
      const order = manager.create(Order, {
        user,
        status: OrderStatus.Pending,
        totalAmount,
        orderProducts,
      });
      for (const item of createOrderInput.products) {
        const product = await manager.findOne(Product, {
          where: { id: item.productId },
        });

        if (!product)
          throw new NotFoundException(`Product ID ${item.productId} not found`);

        // Calculate the current inventory
        const totalStock = await manager
          .createQueryBuilder(InventoryRecord, 'inventory_records')
          .where('inventory_records.productId = :productId', {
            productId: item.productId,
          })
          .select('SUM(inventory_records.quantity)', 'totalStock')
          .getRawOne();

        if ((totalStock.totalStock || 0) < item.quantity) {
          throw new BadRequestException(
            `Product ${product.name} is out of stock`,
          );
        }

        const subtotal = product.price * item.quantity;
        totalAmount += subtotal;

        // Create an order product item
        const orderProduct = manager.create(OrderProduct, {
          product,
          quantity: item.quantity,
          price: product.price,
        });
        orderProducts.push(orderProduct);

        // Create inventory exit record
        const inventory = manager.create(InventoryRecord, {
          product,
          quantity: -item.quantity, // Negative number indicates the warehouse
          type: InventoryType.SALE,
          order,
        });
        inventoryRecords.push(inventory);
      }

      await manager.save(order);
      for (const op of orderProducts) {
        op.order = order;
        await manager.save(op);
      }

      // Save inventory record
      for (const inv of inventoryRecords) {
        inv.order = order;
        await manager.save(inv);
      }

      return order;
    });
  }

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
