import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getRevenue(year?: number) {
    let query = year ? `?year=${year}` : '';
    return this.http.get<any[]>(`${this.url}/statistics/revenue${query}`);
  }
  getVipCustomers(top: number = 5) {
    return this.http.get<any[]>(`${this.url}/statistics/vip?top=${top}`);
  }
}
