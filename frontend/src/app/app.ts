import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list';
import { InventoryMovementComponent } from './inventory-movement/inventory-movement';
import { Product, ProductsService } from './services/products';
import { InventoryService } from './services/inventory';
import { ProductFormComponent } from './product-form/product-form';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ProductListComponent,
    InventoryMovementComponent,
    ProductFormComponent
  ],
  template: `
  <h1 class="app-title">Smart Inventory</h1>
  <p class="app-subtitle">
  Gestión simple y eficiente de productos
  </p>
  <div class="top-section">
    <app-product-form
      (onCreate)="handleCreateProduct($event)">
    </app-product-form>
  </div>
  <div class="inventory-section">
    <app-inventory-movement
      [products]="products"
      (onMove)="handleMove($event)">
    </app-inventory-movement>

    <app-product-list
      [products]="products">
    </app-product-list>
  </div>

  `,
  styleUrls: ['./app.css']
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

  handleMove(event: {
    productId: number;
    type: string;
    quantity: number;
  }) {
    const movementType = event.type === 'IN' ? 'IN' : 'OUT';

    this.inventoryService
      .createMovement({
        productId: event.productId,
        type: movementType,
        quantity: event.quantity
      })
      .subscribe(() => {
        this.loadProducts();
      });
  }
  handleCreateProduct(product: {
  name: string;
  price: number;
  currentStock: number;
  minStock: number;
}) {
  this.productsService.createProduct(product).subscribe(() => {
    this.loadProducts();
  });
}
}
