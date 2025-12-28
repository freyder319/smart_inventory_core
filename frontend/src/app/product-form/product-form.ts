import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css'],
})
export class ProductFormComponent {
  @Output() onCreate = new EventEmitter<{
    name: string;
    price: number;
    currentStock: number;
    minStock: number;
  }>();

  emitCreate(
    name: string,
    price: number,
    stock: number,
    minStock: number
  ) {
    this.onCreate.emit({
      name,
      price,
      currentStock: stock,
      minStock,
    });
  }
}
