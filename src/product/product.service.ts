import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';
import { ListNewProductInput } from './dto/list-new-product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private readonly dataSource: DataSource,
  ) {}

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id: string) {
    return this.productsRepository.findOne({
      where: { id },
    });
  }

  create(createProductInput: CreateProductInput) {
    const { brandId } = createProductInput;
    if (!brandId) throw new BadRequestException('Brand ID is required');
    const newProduct = this.productsRepository.create(createProductInput);
    return this.productsRepository.save(newProduct);
  }

  async listNewProduct(listNewProductInput: ListNewProductInput) {
    // const input = {
    //   name: "Megamax",
    //   description: "Ridgid Megamax Rotary Hammer Head",
    //   brand: {
    //     name: "Ridgid",
    //   },
    //   category: {
    //     name: "Multi Functional Tools",
    //   },
    //   images: [
    //     {
    //       url: "https://images.homedepot.ca/productimages/p_1001102029.jpg?product-images=l",
    //       position: 4,
    //     },
    //     {
    //       url: "https://images.homedepot.ca/productimages/p_1001102029_alt_R8640_U.jpg?product-images=xs",
    //       position: 1,
    //     },
    //     {
    //       url: "https://images.homedepot.ca/productimages/p_1001102029_alt_R8640_U.jpg?product-images=xs",
    //       position: 3,
    //     },
    //     {
    //       url: "https://images.homedepot.ca/productimages/p_1001102029_alt_R8640_U.jpg?product-images=l",
    //       position: 2,
    //     },
    //   ],
    //   variants: [
    //     {
    //       size: "30*36*60",
    //       sku: "Rigid-Megamax-8600403B",
    //       color: "Orange",
    //       prices: [
    //         {
    //           price: 198,
    //           validFrom: "2025-02-01T08:36:06.000Z",
    //           validTo: "2025-02-14T08:36:10.000Z",
    //         },
    //         {
    //           price: 198,
    //           validFrom: "2025-02-15T08:36:06.000Z",
    //           validTo: "2025-03-01T08:36:10.000Z",
    //         },
    //       ],
    //     },
    //     {
    //       size: "30*32*66",
    //       sku: "Rigid-Megamax-8600406B",
    //       color: "Orange",
    //       prices: [],
    //     },
    //   ],
    // };

    const input = listNewProductInput;
    return await this.dataSource.transaction(async (manager) => {
      // Use transactionManager instead of repository
      const brandRepo = manager.getRepository(Brand);
      const categoryRepo = manager.getRepository(Category);
      const productRepo = manager.getRepository(Product);

      // First find out if there is already the same Brand & Category
      const brand =
        (await brandRepo.findOne({ where: { name: input.brand.name } })) ||
        brandRepo.create({ name: input.brand.name });

      const category =
        (await categoryRepo.findOne({
          where: { name: input.category.name },
        })) || categoryRepo.create({ name: input.category.name });

      // Create Product (cascaded insert)
      const product = productRepo.create({
        ...input,
        brand,
        category,
      });

      return await productRepo.save(product);
    });
  }
}
