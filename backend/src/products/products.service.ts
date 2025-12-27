import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  create(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(dto);
    return this.productRepo.save(product);
  }

  async findAll(): Promise<any[]> {
    const products = await this.productRepo.find();
    return products.map(p => ({
      ...p,
      status: p.currentStock <= p.minStock ? 'Alert' : 'Ok',
    }));
  }

  async updateStock(id: number, quantity: number): Promise<Product> {
    const product = await this.productRepo.findOneBy({ id });

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    product.currentStock += quantity;
    return this.productRepo.save(product);
  }
}
