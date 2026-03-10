import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrderService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getCart(customerId: string) { return this.http.get<any>(`${this.url}/orders/cart/${customerId}`); }
  addToCart(data: any) { return this.http.post<any>(`${this.url}/orders/addtocart`, data); }
  updateCartItem(orderDetailId: string, data: any) { return this.http.put<any>(`${this.url}/orders/cartitem/${orderDetailId}`, data); }
  removeCartItem(orderDetailId: string, orderId: string) { return this.http.delete<any>(`${this.url}/orders/cartitem/${orderDetailId}?orderId=${orderId}`); }
  checkout(orderId: string) { return this.http.put<any>(`${this.url}/orders/checkout/${orderId}`, {}); }
  getAll() { return this.http.get<any[]>(`${this.url}/orders`); }
}
