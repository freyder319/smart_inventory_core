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
  <div *ngIf="successMessage" class="alert success">
  {{ successMessage }}
  </div>
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
<div class="inventory-section">

  <div class="table-container">

    <div class="table-header">
      <h3 class="section-title">Inventario</h3>

      <div class="filter-buttons">
        <button (click)="loadAllProducts()">Ver todos</button>
        <button class="alert-btn" (click)="loadAlertProducts()">
          Ver solo en alerta
        </button>
      </div>
    </div>

    <app-product-list
      [products]="products">
    </app-product-list>

  </div>

</div>


  `,
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  successMessage: string | null = null;

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
  loadAllProducts() {
  this.productsService.getProducts().subscribe(data => {
    this.products = data;
  });
}

  loadAlertProducts() {
    this.productsService.getAlertProducts().subscribe(data => {
      this.products = data;
    });
  }
  showSuccess(message: string) {
  this.successMessage = message;

  setTimeout(() => {
    this.successMessage = null;
  }, 3000); 
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
        this.showSuccess('Movimiento de inventario registrado');
      });
  }
  handleCreateProduct(product: {
  name: string;
  price: number;
  currentStock: number;
  minStock: number;
  }) {
  this.productsService.createProduct(product).subscribe((createdProduct: any) => {
    this.loadProducts();
    this.showSuccess(' Producto registrado correctamente');
  });
}

}
