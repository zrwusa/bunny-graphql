import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';
import { ListNewProductInput } from './dto/list-new-product.input';
import { Warehouse } from './entities/warehouse.entity';

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
    return await this.dataSource.transaction(async (manager) => {
      const brandRepo = manager.getRepository(Brand);
      const categoryRepo = manager.getRepository(Category);
      const productRepo = manager.getRepository(Product);
      const warehouseRepo = manager.getRepository(Warehouse);

      // Handle Brand (supports id or name)
      const { brand } = listNewProductInput;
      let brandEntity: Brand | null = null;

      if (brand.id) {
        brandEntity = await brandRepo.findOne({ where: { id: brand.id } });
        if (!brandEntity)
          throw new Error(`Brand with id ${brand.id} not found`);
      } else {
        brandEntity =
          (await brandRepo.findOne({ where: { name: brand.name } })) ||
          brandRepo.create({ name: brand.name });
      }

      // Handle Category (supports id or name)
      const { category } = listNewProductInput;
      let categoryEntity: Category | null = null;

      if (category.id) {
        categoryEntity = await categoryRepo.findOne({
          where: { id: category.id },
        });
        if (!categoryEntity)
          throw new Error(`Category with id ${category.id} not found`);
      } else {
        categoryEntity =
          (await categoryRepo.findOne({ where: { name: category.name } })) ||
          categoryRepo.create({ name: category.name });
      }

      // Handle Variants & Inventories
      const variants = await Promise.all(
        listNewProductInput.variants.map(async (variantInput) => {
          const inventories = await Promise.all(
            variantInput.inventories.map(async (inventoryInput) => {
              const { warehouse: warehouseInput } = inventoryInput;
              let warehouse: Warehouse | null = null;

              if (warehouseInput.id) {
                warehouse = await warehouseRepo.findOne({
                  where: { id: warehouseInput.id },
                });
                if (!warehouse)
                  throw new Error(
                    `Warehouse with id ${warehouseInput.id} not found`,
                  );
              } else {
                if (!warehouseInput.name || !warehouseInput.location) {
                  throw new Error(
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
        ...listNewProductInput,
        brand: brandEntity,
        category: categoryEntity,
        variants,
      });

      return await productRepo.save(product);
    });
  }
}
