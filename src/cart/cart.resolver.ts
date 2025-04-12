import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { CartSession } from './entities/cart-session.entity';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';

@Resolver(() => CartSession)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation(() => CartSession)
  createCart(@Args('createCartInput') createCartInput: CreateCartInput) {
    return this.cartService.create(createCartInput);
  }

  @Query(() => [CartSession], { name: 'cart' })
  findAll() {
    return this.cartService.findAll();
  }

  @Query(() => CartSession, { name: 'cart' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cartService.findOne(id);
  }

  @Mutation(() => CartSession)
  updateCart(@Args('updateCartInput') updateCartInput: UpdateCartInput) {
    return this.cartService.update(updateCartInput.id, updateCartInput);
  }

  @Mutation(() => CartSession)
  removeCart(@Args('id', { type: () => Int }) id: number) {
    return this.cartService.remove(id);
  }
}
