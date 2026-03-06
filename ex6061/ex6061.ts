import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ex6061',
  standalone: false,
  templateUrl: './ex6061.html',
  styleUrl: './ex6061.css',
})
export class Ex6061 {
  baseUrl = 'http://localhost:3002';
  message = '';
  loading = false;

  constructor(private http: HttpClient) {}

  createCookie() {
    this.loading = true;
    this.http
      .get(`${this.baseUrl}/create-cookie`, {
        responseType: 'text',
        withCredentials: true,
      })
      .subscribe({
        next: (res) => {
          this.message = res;
          this.loading = false;
        },
        error: () => {
          this.message = 'Lỗi kết nối server';
          this.loading = false;
        },
      });
  }

  readCookie() {
    this.loading = true;
    this.http
      .get(`${this.baseUrl}/read-cookie`, {
        responseType: 'text',
        withCredentials: true,
      })
      .subscribe({
        next: (res) => {
          this.message = res;
          this.loading = false;
        },
        error: () => {
          this.message = 'Lỗi kết nối server';
          this.loading = false;
        },
      });
  }

  createLimitedCookie() {
    this.loading = true;
    this.http
      .get(`${this.baseUrl}/create-limited-cookie`, {
        responseType: 'text',
        withCredentials: true,
      })
      .subscribe({
        next: (res) => {
          this.message = res;
          this.loading = false;
        },
        error: () => {
          this.message = 'Lỗi kết nối server';
          this.loading = false;
        },
      });
  }

  clearCookie() {
    this.loading = true;
    this.http
      .get(`${this.baseUrl}/clear-cookie`, {
        responseType: 'text',
        withCredentials: true,
      })
      .subscribe({
        next: (res) => {
          this.message = res;
          this.loading = false;
        },
        error: () => {
          this.message = 'Lỗi kết nối server';
          this.loading = false;
        },
      });
  }
}
