import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductsService } from './services/products';
import { InventoryService } from './services/inventory';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Productos</h2>

    <table border="1" cellpadding="8">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Stock</th>
          <th>Mínimo</th>
          <th>Estado</th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let product of products">
          <td>{{ product.name }}</td>
          <td>{{ product.currentStock }}</td>
          <td>{{ product.minStock }}</td>
          <td
            [style.color]="product.status === 'Alert' ? 'red' : 'green'"
          >
            {{ product.status }}
          </td>
        </tr>
      </tbody>
    </table>

    <hr />

    <h3>Movimiento de inventario</h3>

    <select #productId>
      <option *ngFor="let p of products" [value]="p.id">
        {{ p.name }}
      </option>
    </select>

    <select #type>
      <option value="IN">Entrada</option>
      <option value="OUT">Salida</option>
    </select>

    <input type="number" #qty placeholder="Cantidad" />

    <button (click)="move(+productId.value, type.value, +qty.value)">
      Aplicar
    </button>
  `,
})
export class App implements OnInit {
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

move(productId: number, type: string, quantity: number) {
  const movementType = type === 'IN' ? 'IN' : 'OUT';

  this.inventoryService
    .createMovement({
      productId,
      type: movementType,
      quantity,
    })
    .subscribe(() => {
      this.loadProducts();
    });
  }
}
