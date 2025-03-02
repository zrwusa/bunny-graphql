import { Test, TestingModule } from '@nestjs/testing';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { FilterOrderInput } from './dto/filter-order.input';
import { OrderStatus, PaymentMethod, PaymentStatus, ShippingStatus } from '../common/enums';
import { User } from '../user/entities/user.entity';

describe('OrderResolver', () => {
  let resolver: OrderResolver;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderResolver,
        {
          provide: OrderService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<OrderResolver>(OrderResolver);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of orders filtered by input', async () => {
      const mockOrders: Order[] = [
        {
          id: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
          user: {
            id: '1',
            username: 'john_doe',
            email: 'john.doe@example.com',
            posts: [],
            orders: [],
            oauthId: null,
            provider: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            setId: jest.fn(),
          } as User,
          items: [],
          status: OrderStatus.Pending,
          paymentStatus: PaymentStatus.Pending,
          shippingStatus: ShippingStatus.Pending,
          paymentMethod: PaymentMethod.CreditCard,
          totalPrice: 200.0,
          setId: jest.fn(),
        },
      ];

      const filterInput: FilterOrderInput = {
        status: OrderStatus.Pending,
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-12-31'),
        page: 1,
        pageSize: 10,
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(mockOrders);

      const result = await resolver.findAll(filterInput);

      expect(service.findAll).toHaveBeenCalledWith(filterInput);
      expect(result).toEqual(mockOrders);

      // Validate structure of the first returned order
      const firstOrder = result[0];
      expect(firstOrder).toHaveProperty('id', '1');
      expect(firstOrder).toHaveProperty('user');
      expect(firstOrder.user).toHaveProperty('username', 'john_doe');
      expect(firstOrder).toHaveProperty('status', OrderStatus.Pending);
      expect(firstOrder).toHaveProperty('paymentStatus', PaymentStatus.Pending);
      expect(firstOrder).toHaveProperty('shippingStatus', ShippingStatus.Pending);
      expect(firstOrder).toHaveProperty('paymentMethod', PaymentMethod.CreditCard);
      expect(firstOrder).toHaveProperty('totalPrice', 200.0);
    });
  });
});
