import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            create: jest.fn().mockImplementation(dto => dto),
            save: jest.fn().mockImplementation(product =>
              Promise.resolve({ id: 1, ...product }),
            ),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should create a product', async () => {
    const product = await service.create({
      name: 'Mouse',
      price: 20000,
      currentStock: 10,
      minStock: 5,
    });

    expect(product).toBeDefined();
    expect(product.id).toBe(1);
    expect(product.name).toBe('Mouse');
    expect(product.currentStock).toBe(10);
    expect(product.minStock).toBe(5);
  });
});
