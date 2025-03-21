import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';
import { PublishProductInput } from './dto/publish-product.input';
import { Warehouse } from './entities/warehouse.entity';
import { SearchService } from '../search/search.service';
import { SearchProductDto } from '../search/dto/search-product.dto';

export function transformProductToSearchDto(product: Product): SearchProductDto {
  return {
    id: product.id.toString(),
    name: product.name,
    description: product.description || {},
    category: product.category?.name || '',
    brand: product.brand?.name || '',
    variants: product.variants?.map((v) => v.size) || [],
  };
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private readonly dataSource: DataSource,
    private readonly searchService: SearchService,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: string) {
    return this.productRepo.findOne({
      where: { id },
    });
  }

  create(createProductInput: CreateProductInput) {
    const { brandId } = createProductInput;
    if (!brandId) throw new BadRequestException('Brand ID is required');
    const newProduct = this.productRepo.create(createProductInput);
    return this.productRepo.save(newProduct);
  }

  async publishProduct(publishProductInput: PublishProductInput) {
    return await this.dataSource.transaction(async (manager) => {
      const brandRepo = manager.getRepository(Brand);
      const categoryRepo = manager.getRepository(Category);
      const productRepo = manager.getRepository(Product);
      const warehouseRepo = manager.getRepository(Warehouse);

      // Handle Brand (supports id or name)
      const {
        brand: { id: brandId, name: brandName },
      } = publishProductInput;

      let brand: Brand | null = null;

      if (brandId) {
        brand = await brandRepo.findOne({ where: { id: brandId } });
        if (!brand) throw new NotFoundException(`Brand with id ${brandId} not found`);
      } else {
        brand =
          (await brandRepo.findOne({ where: { name: brandName } })) ||
          brandRepo.create({ name: brandName });
      }

      // Handle Category (supports id or name)
      const {
        category: { id: categoryId, name: categoryName },
      } = publishProductInput;
      let category: Category | null = null;

      if (categoryId) {
        category = await categoryRepo.findOne({
          where: { id: categoryId },
        });
        if (!category) throw new NotFoundException(`Category with id ${categoryId} not found`);
      } else {
        category =
          (await categoryRepo.findOne({ where: { name: categoryName } })) ??
          categoryRepo.create({ name: categoryName });
      }

      // Handle Variants & Inventories
      const variants = await Promise.all(
        publishProductInput.variants.map(async (variantInput) => {
          const inventories = await Promise.all(
            variantInput.inventories.map(async (inventoryInput) => {
              const { warehouse: warehouseInput } = inventoryInput;
              let warehouse: Warehouse | null = null;

              if (warehouseInput.id) {
                warehouse = await warehouseRepo.findOne({
                  where: { id: warehouseInput.id },
                });
                if (!warehouse)
                  throw new NotFoundException(`Warehouse with id ${warehouseInput.id} not found`);
              } else {
                if (!warehouseInput.name || !warehouseInput.location) {
                  throw new BadRequestException(
                    `Warehouse must have both name and location if id is not provided`,
                  );
                }
                warehouse =
                  (await warehouseRepo.findOne({
                    where: {
                      name: warehouseInput.name,
                      location: warehouseInput.location,
                    },
                  })) ||
                  warehouseRepo.create({
                    name: warehouseInput.name,
                    location: warehouseInput.location,
                  });
              }

              return {
                quantity: inventoryInput.quantity,
                warehouse,
              };
            }),
          );

          return {
            ...variantInput,
            inventories,
          };
        }),
      );

      // Create Product
      const product = productRepo.create({
        ...publishProductInput,
        brand,
        category,
        variants,
      });

      return productRepo.save(product);
    });
  }

  // Batch synchronized products (optional for timing tasks)
  async bulkIndexProducts(products: Product[]) {
    const searchProducts = products.map(transformProductToSearchDto);
    return this.searchService.bulkIndexProducts(searchProducts);
  }
}
