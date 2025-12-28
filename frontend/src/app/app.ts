import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';

import { ProductListComponent } from './product-list/product-list';
import { InventoryMovementComponent } from './inventory-movement/inventory-movement';
import { ProductFormComponent } from './product-form/product-form';

import { ProductsService, Product } from './services/products';
import { InventoryService } from './services/inventory';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ProductListComponent,
    InventoryMovementComponent,
    ProductFormComponent
  ],
  styleUrls: ['./app.css'],
  template: `
    <h1 class="app-title">Smart Inventory</h1>

    <app-product-form
      (onCreate)="handleCreateProduct($event)">
    </app-product-form>
    <app-inventory-movement
      [products]="(products$ | async) ?? []"
      (onMove)="handleMove($event)">
    </app-inventory-movement>
    <div *ngIf="errorMessage" class="alert error">
      {{ errorMessage }}
    </div>
    <div class="table-container">
      <div class="table-inner">
        <div class="table-header">
          <h3 class="section-title">Inventario</h3>
          <div class="filter-buttons">
            <button (click)="showAll()">Ver todos</button>
            <button class="alert-btn" (click)="showAlerts()">
              Ver solo en alerta
            </button>
          </div>
        </div>
        <app-product-list
          [products]="products$ | async">
        </app-product-list>
      </div>
    </div>

  `,
})
export class App {

  private refresh$ = new Subject<void>();
  private mode: 'ALL' | 'ALERTS' = 'ALL';
  errorMessage: string | null = null;
  products$: Observable<Product[]> = this.refresh$.pipe(
    startWith(void 0),
    switchMap(() =>
      this.mode === 'ALL'
        ? this.productsService.getProducts()
        : this.productsService.getAlertProducts()
    )
  );

  constructor(
    private productsService: ProductsService,
    private inventoryService: InventoryService
  ) {}

  showAll() {
    this.mode = 'ALL';
    this.refresh$.next();
  }

  showAlerts() {
    this.mode = 'ALERTS';
    this.refresh$.next();
  }

  handleCreateProduct(product: any) {
    this.productsService.createProduct(product).subscribe(() => {
      this.refresh$.next();
    });
  }

handleMove(event: any) {
  this.inventoryService.createMovement(event).subscribe({
    next: () => {
      this.errorMessage = null; // limpia errores
      this.refresh$.next();
    },
    error: (err) => {
      if (err.status === 400) {
        this.errorMessage = err.error?.message || 'Stock insuficiente';
      } else {
        this.errorMessage = 'Ocurrió un error inesperado';
      }
    }
  });
}
}
