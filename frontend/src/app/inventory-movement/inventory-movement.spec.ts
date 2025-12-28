import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMovementComponent } from './inventory-movement';

describe('InventoryMovement', () => {
  let component: InventoryMovementComponent;
  let fixture: ComponentFixture<InventoryMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryMovementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryMovementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
