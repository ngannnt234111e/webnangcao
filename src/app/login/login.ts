import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../my-service/customer.service';
import { EmployeeService } from '../my-service/employee.service';
import { AuthService } from '../my-service/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginMode: string = 'customer';
  username: string = '';
  password: string = '';
  message: string = '';
  isError: boolean = false;

  constructor(
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.message = '';
    if (!this.username || !this.password) {
      this.message = 'Vui lòng nhập đầy đủ thông tin!'; this.isError = true; return;
    }
    if (this.loginMode === 'customer') {
      this.customerService.login(this.username, this.password).subscribe(res => {
        if (res.success) {
          this.authService.setUser(res.customer, 'customer');
          this.message = '✅ Đăng nhập thành công! Chào ' + res.customer.CustomerName;
          this.isError = false;
          setTimeout(() => this.router.navigate(['/shopping']), 1500);
        } else { this.message = '❌ Sai tên đăng nhập hoặc mật khẩu!'; this.isError = true; }
      });
    } else {
      this.employeeService.login(this.username, this.password).subscribe(res => {
        if (res.success) {
          this.authService.setUser(res.employee, 'employee');
          this.message = '✅ Đăng nhập thành công! Chào ' + res.employee.EmployeeName;
          this.isError = false;
          setTimeout(() => this.router.navigate(['/shopping']), 1500);
        } else { this.message = '❌ Sai tên đăng nhập hoặc mật khẩu!'; this.isError = true; }
      });
    }
  }

  goBack() { this.router.navigate(['/shopping']); }
}
