import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilterOrderInput } from './dto/filter-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import { OrderItem } from './entities/order-item.entity';
import { InventoryRecord } from '../product/entities/inventory-record.entity';
import { InventoryType, OrderStatus } from '../common/enums';
import { PaymentService } from '../payment/payment.service';
// import { PaymentStatus } from '../common/enums';
// import { Payment } from '../payment/entities/payment.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly dataSource: DataSource,
    private readonly paymentService: PaymentService,
  ) {}

  async create(createOrderInput: CreateOrderInput) {
    const { userId } = createOrderInput;
    const order = await this.dataSource.transaction(async (manager) => {
      const user = await manager.findOne(User, { where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');

      const inventoryRecords: InventoryRecord[] = [];
      // Create an order
      const order = manager.create(Order, {
        user,
        status: OrderStatus.Pending,
        totalPrice: 0,
        items: [] as OrderItem[],
      });
      for (const { productId, quantity } of createOrderInput.items) {
        const product = await manager.findOneBy(Product, {
          id: productId,
        });

        if (!product)
          throw new NotFoundException(`Product ID ${productId} not found`);

        // Calculate the current inventory
        const totalStock = await manager
          .createQueryBuilder(InventoryRecord, 'inventory_records')
          .where('inventory_records.productId = :productId', {
            productId,
          })
          .select('SUM(inventory_records.quantity)', 'totalStock')
          .getRawOne<{ totalStock: string }>();

        if ((Number(totalStock.totalStock) || 0) < quantity) {
          throw new BadRequestException(
            `Product ${product.name} is out of stock`,
          );
        }

        const subtotal = product.price * quantity;
        order.totalPrice += subtotal;

        // Create an order product item
        const orderItem = manager.create(OrderItem, {
          product,
          quantity,
          price: product.price,
        });
        order.items.push(orderItem);

        // Create inventory exit record
        const inventoryRecord = manager.create(InventoryRecord, {
          product,
          quantity: -quantity, // Negative number indicates the warehouse
          type: InventoryType.SALE,
          order,
        });
        inventoryRecords.push(inventoryRecord);
      }

      await manager.save(order);
      for (const op of order.items) {
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

    // Immediately generate payment orders after the order is created
    const payment = await this.paymentService.create(order.id);
    order.payments = [payment];
    return order;
  }

  findAll({ page, pageSize }: FilterOrderInput) {
    return this.orderRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['items'],
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
