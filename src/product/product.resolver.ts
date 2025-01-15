import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => Product, { nullable: true })
  getProductById(@Args('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Query(() => [Product])
  getProducts() {
    return this.productService.getProducts();
  }

  @Mutation(() => Product)
  createProduct(@Args('createProductDto') createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }
}
