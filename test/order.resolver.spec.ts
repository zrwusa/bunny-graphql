import { Test, TestingModule } from '@nestjs/testing';
import { OrderResolver } from '../src/order/order.resolver';
import { OrderService } from '../src/order/order.service';

describe('OrderResolver', () => {
  let resolver: OrderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderResolver, OrderService],
    }).compile();

    resolver = module.get<OrderResolver>(OrderResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
