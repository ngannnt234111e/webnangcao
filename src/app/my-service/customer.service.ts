import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${this.url}/customers/login`, { Username: username, Password: password });
  }
  getAll() { return this.http.get<any[]>(`${this.url}/customers`); }
  add(c: any) { return this.http.post<any[]>(`${this.url}/customers`, c); }
  update(id: string, c: any) { return this.http.put<any[]>(`${this.url}/customers/${id}`, c); }
  delete(id: string) { return this.http.delete<any[]>(`${this.url}/customers/${id}`); }
}
