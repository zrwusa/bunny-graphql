import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  getProducts() {
    return this.productsRepository.find();
  }

  getProductById(id: string) {
    return this.productsRepository.findOne({
      where: { id },
    });
  }

  createProduct(createProductData: CreateProductDto) {
    const newProduct = this.productsRepository.create(createProductData);
    return this.productsRepository.save(newProduct);
  }
}
