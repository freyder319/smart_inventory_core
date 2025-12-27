import { IsIn, IsInt, IsPositive } from 'class-validator';

export class CreateMovementDto {
  @IsInt()
  productId: number;

  @IsIn(['IN', 'OUT'])
  type: 'IN' | 'OUT';

  @IsPositive()
  quantity: number;
}
