import { Field, InputType } from '@nestjs/graphql';
import { PaginationArgs } from '../../common/dto/pagination-args';

@InputType()
export class FilterOrderInput extends PaginationArgs {
  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;
}
