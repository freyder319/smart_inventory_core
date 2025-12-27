import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-movement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-movement.component.html',
})
export class InventoryMovementComponent {
  @Input() products: any[] = [];
  @Output() onMove = new EventEmitter<{
    productId: number;
    type: string;
    quantity: number;
  }>();
}
