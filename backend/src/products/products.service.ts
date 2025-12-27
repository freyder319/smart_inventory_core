import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products:Product[]=[];
  private idCounter=1;
  create(createProductDto: CreateProductDto):Product {
    const product: Product= {
      id:this.idCounter++,
      ...createProductDto,
    };
    this.products.push(product);
    return product;
  }

  findAll(): Product[] {
    return this.products.map(product =>({
      ...product,
      status: product.currentStock <= product.minStock ? 'Alert' : 'Ok'
    }));
  }

  findOne(id: number):Product|undefined {
    return this.products.find(product=>product.id===id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
