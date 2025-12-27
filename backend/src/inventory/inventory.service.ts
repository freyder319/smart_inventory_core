import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { ProductsService } from 'src/products/products.service';
import { InventoryMovement } from './entities/inventory-movement.entity';
import { CreateMovementDto } from './dto/create-movement.dto';

@Injectable()
export class InventoryService {
  private movements:InventoryMovement[]=[];
  private idCounter=1;
  constructor(private readonly productsService:ProductsService){}
  create(dto: CreateMovementDto) {
    const product= this.productsService.findOne(dto.productId)
    if(!product){
      throw new NotFoundException("Product not Found");
    }
    if(dto.type === 'OUT'&& product.currentStock< dto.quantity){
      throw new BadRequestException("Insufficient Stock");
    }
    // Actualizar Stock
    product.currentStock +=
    dto.type === 'IN' ? dto.quantity : -dto.quantity;
    const movement: InventoryMovement = {
      id:this.idCounter++,
      productId:dto.productId,
      type: dto.type,
      quantity: dto.quantity,
      date: new Date(),
    }
    this.movements.push(movement);
    return movement;
  }

  findAll() {
    return this.movements;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventory`;
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}
