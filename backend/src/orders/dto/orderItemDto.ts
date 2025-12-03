import { IsInt, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';

export class OrderItemDto {
  @IsInt()
  product_id: number;

  @IsInt()
  quantity: number;
}