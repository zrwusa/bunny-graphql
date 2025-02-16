import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { InventoryType } from '../../common/enums';

@InputType()
class ImageInput {
  @Field()
  @IsString()
  url: string;

  @Field()
  @IsNumber()
  position: number;
}

@InputType()
class PriceInput {
  @Field()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @Field()
  @IsDate()
  validFrom: Date;

  @Field()
  @IsDate()
  validTo: Date;
}

@InputType()
class VariantInput {
  @Field()
  @IsString()
  size: string;

  @Field()
  @IsString()
  sku: string;

  @Field()
  @IsString()
  color: string;

  @Field(() => [PriceInput], { nullable: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PriceInput)
  @IsOptional()
  prices?: PriceInput[];

  @Field(() => [InventoryInput], { nullable: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InventoryInput)
  @IsOptional()
  inventories?: InventoryInput[];

  @Field(() => [InventoryRecordInput], { nullable: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InventoryRecordInput)
  @IsOptional()
  inventoryRecords?: InventoryRecordInput[];
}

@InputType()
class BrandInput {
  @Field()
  @IsString()
  name: string;
}

@InputType()
class CategoryInput {
  @Field()
  @IsString()
  name: string;
}

@InputType()
class InventoryInput {
  @Field()
  @IsNumber({ maxDecimalPlaces: 0 })
  quantity: number;
}

@InputType()
class InventoryRecordInput {
  @Field()
  @IsNumber({ maxDecimalPlaces: 0 })
  changeQuantity: number;

  @Field()
  type: InventoryType;
}

// @InputType()
// class UserInput {
//   @Field()
//   @IsString()
//   username: string;
// }

// @InputType()
// class ReviewInput {
//   @Field()
//   @IsNumber({ maxDecimalPlaces: 0 })
//   rating: number;
//
//   @Field()
//   @IsString()
//   comment: string;
//
//   @Field()
//   user: UserInput;
// }

@InputType()
export class ListNewProductInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field(() => BrandInput)
  @ValidateNested()
  @Type(() => BrandInput)
  brand: BrandInput;

  @Field(() => CategoryInput)
  @ValidateNested()
  @Type(() => CategoryInput)
  category: CategoryInput;

  @Field(() => [ImageInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageInput)
  images: ImageInput[];

  @Field(() => [VariantInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantInput)
  variants: VariantInput[];

  // @Field(() => [ReviewInput])
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => ReviewInput)
  // reviews: ReviewInput[];
}
