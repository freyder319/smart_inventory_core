import { Controller, Post, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateMovementDto } from './dto/create-movement.dto';

@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
  ) {}

  @Post()
  createMovement(@Body() dto: CreateMovementDto) {
    return this.inventoryService.createMovement(dto);
  }
}
