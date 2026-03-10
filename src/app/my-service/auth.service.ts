import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  setUser(user: any, role: string) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userRole', role);
  }
  getUser() {
    let u = localStorage.getItem('currentUser');
    return u ? JSON.parse(u) : null;
  }
  getRole() { return localStorage.getItem('userRole'); }
  getUserName(): string {
    let u = this.getUser();
    if (!u) return '';
    return u.CustomerName || u.EmployeeName || '';
  }
  isLoggedIn(): boolean { return !!this.getUser(); }
  isEmployee(): boolean { return this.getRole() === 'employee'; }
  isCustomer(): boolean { return this.getRole() === 'customer'; }
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
  }
}
