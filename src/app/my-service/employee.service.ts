import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${this.url}/employees/login`, { Username: username, Password: password });
  }
  getAll() { return this.http.get<any[]>(`${this.url}/employees`); }
}
