import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '514022',
      database: 'smart_inventory',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
