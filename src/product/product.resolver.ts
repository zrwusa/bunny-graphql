import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { ProductService } from './product.service';
import { ProductReviewLoader } from './loaders/product-review.loader';
import { ProductReview } from './entities/product-review.entity';
import { ListNewProductInput } from './dto/list-new-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private productService: ProductService,
    private readonly productReviewLoader: ProductReviewLoader,
  ) {}

  @Query(() => Product, { name: 'product', nullable: true })
  findOne(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productService.findAll();
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  @Mutation(() => Product)
  listNewProduct(
    @Args('listNewProductInput') listNewProductInput: ListNewProductInput,
  ) {
    return this.productService.listNewProduct(listNewProductInput);
  }

  @ResolveField(() => [ProductReview])
  async reviews(@Parent() product: Product) {
    return this.productReviewLoader.loadProductReviews(product.id);
  }
}
