import { IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    name:string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @Min(0)
    currentStock:number;

    @IsNumber()
    @Min(0)
    minStock:number;
}
