import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private apiUrl= 'http://localhost:3000/inventory';

  constructor(private http:HttpClient){}

  createMovement(data:{ productId:number; type:'IN'|'OUT'; quantity:number}){
    return this.http.post(this.apiUrl,data);
  }
}
