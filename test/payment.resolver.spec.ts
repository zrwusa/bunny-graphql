import { Test, TestingModule } from '@nestjs/testing';
import { PaymentResolver } from '../src/payment/payment.resolver';
import { PaymentService } from '../src/payment/payment.service';

describe('PaymentResolver', () => {
  let resolver: PaymentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentResolver, PaymentService],
    }).compile();

    resolver = module.get<PaymentResolver>(PaymentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
