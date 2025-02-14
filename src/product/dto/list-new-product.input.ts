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
  @IsNumber()
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
}
