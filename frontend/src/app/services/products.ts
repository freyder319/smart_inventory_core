import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Product {
  id:number;
  name:string;
  price:number;
  currentStock:number;
  minStock: number;
  status:'Ok'|'Alert';
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService{
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http:HttpClient){}

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl);
  }
  
  createProduct(product:Omit<Product,'id'|'status'>){
    return this.http.post<Product>(this.apiUrl,product);
  }
  getAlertProducts(): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.apiUrl}/alerts`);
}
}
