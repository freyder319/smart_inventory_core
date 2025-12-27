export type MovementType = 'IN' | 'OUT';

export class InventoryMovement {
  id: number;
  productId: number;
  type: MovementType;
  quantity: number;
  date: Date;
}