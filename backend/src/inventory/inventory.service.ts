import { Injectable, BadRequestException } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CreateMovementDto } from './dto/create-movement.dto';

@Injectable()
export class InventoryService {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  async createMovement(dto: CreateMovementDto) {
    const { productId, type, quantity } = dto;

    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than zero');
    }

    const product = await this.productsService.findOne(productId);

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    if (type === 'OUT' && product.currentStock < quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    const stockChange = type === 'IN' ? quantity : -quantity;

    const updatedProduct = await this.productsService.updateStock(
      productId,
      stockChange,
    );

    return {
      productId,
      type,
      quantity,
      currentStock: updatedProduct.currentStock,
      date: new Date(),
    };
  }
}
