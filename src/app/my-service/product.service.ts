import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getAll() { return this.http.get<any[]>(`${this.url}/products`); }
  getById(id: string) { return this.http.get<any>(`${this.url}/products/${id}`); }
  searchByPrice(min: number, max: number) { return this.http.get<any[]>(`${this.url}/products/search/price?min=${min}&max=${max}`); }
  searchByModel(model: string) { return this.http.get<any[]>(`${this.url}/products/search/model?model=${model}`); }
  searchByMadeBy(madeby: string) { return this.http.get<any[]>(`${this.url}/products/search/madeby?madeby=${madeby}`); }
  sortByPrice(order: string) { return this.http.get<any[]>(`${this.url}/products/sort/price?order=${order}`); }
  add(product: any) { return this.http.post<any[]>(`${this.url}/products`, product); }
  update(id: string, product: any) { return this.http.put<any[]>(`${this.url}/products/${id}`, product); }
  delete(id: string) { return this.http.delete<any[]>(`${this.url}/products/${id}`); }
}
