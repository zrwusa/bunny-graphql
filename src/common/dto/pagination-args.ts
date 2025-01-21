import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaginationArgs {
  @Field(() => Number, { defaultValue: 1 })
  page: number;

  @Field(() => Number, { defaultValue: 10 })
  pageSize: number;
}
