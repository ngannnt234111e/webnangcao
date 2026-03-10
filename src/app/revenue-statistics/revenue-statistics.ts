import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StatisticsService } from '../my-service/statistics.service';
import { AuthService } from '../my-service/auth.service';
import { OrderService } from '../my-service/order.service';

@Component({
  selector: 'app-revenue-statistics',
  imports: [CommonModule, FormsModule],
  templateUrl: './revenue-statistics.html',
  styleUrl: './revenue-statistics.css',
})
export class RevenueStatistics implements OnInit {
  // Thống kê theo danh mục
  stats: any[] = [];
  selectedYear: number = 2024;
  totalRevenue: number = 0;
  selectedRow: string = '';

  // Danh sách đơn hàng đã thanh toán
  paidOrders: any[] = [];
  allOrders: any[] = [];
  showOrders: boolean = false;

  // Danh sách năm có thể chọn
  years: number[] = [2022, 2023, 2024, 2025];

  employeeName: string = '';

  constructor(
    private statisticsService: StatisticsService,
    public authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn() || !this.authService.isEmployee()) {
      alert('Chỉ nhân viên mới có thể xem thống kê doanh thu!');
      this.router.navigate(['/login']); return;
    }
    this.employeeName = this.authService.getUserName();
    this.loadStats();
    this.loadPaidOrders();
  }

  // Load thống kê doanh thu theo năm & danh mục từ backend
  loadStats() {
    this.statisticsService.getRevenue(this.selectedYear).subscribe({
      next: (data) => {
        this.stats = data;
        this.totalRevenue = data.reduce((sum: number, s: any) => sum + s.Revenue, 0);
      },
      error: () => {
        this.stats = [];
        this.totalRevenue = 0;
      }
    });
  }

  // Load danh sách tất cả đơn hàng và lọc status = "paid"
  loadPaidOrders() {
    this.orderService.getAll().subscribe({
      next: (orders) => {
        this.allOrders = orders;
        // Lọc chỉ đơn hàng đã thanh toán (status = "paid")
        this.paidOrders = orders.filter((o: any) =>
          o.Status === 'paid' || o.PaymentStatus === 'paid'
        );
      },
      error: () => { this.paidOrders = []; }
    });
  }

  selectRow(name: string) { this.selectedRow = name; }
  isSelected(name: string): boolean { return this.selectedRow === name; }
  formatPrice(p: number): string { return (p || 0).toLocaleString('vi-VN') + ' đ'; }
  formatDate(d: string): string { return d ? new Date(d).toLocaleDateString('vi-VN') : ''; }
  goBack() { this.router.navigate(['/shopping']); }
  toggleOrders() { this.showOrders = !this.showOrders; }

  getPercentage(revenue: number): string {
    if (this.totalRevenue === 0) return '0';
    return ((revenue / this.totalRevenue) * 100).toFixed(1);
  }
}
