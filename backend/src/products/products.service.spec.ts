import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
  });

  it('should create a product', () => {
    const product = service.create({
      name: 'Mouse',
      price: 20000,
      currentStock: 10,
      minStock: 5,
    });

    expect(product).toBeDefined();
    expect(product.id).toBe(1);
    expect(product.name).toBe('Mouse');
    expect(product.currentStock).toBe(10);
  });
});
