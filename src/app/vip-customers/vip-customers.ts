import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StatisticsService } from '../my-service/statistics.service';
import { AuthService } from '../my-service/auth.service';

@Component({
  selector: 'app-vip-customers',
  imports: [CommonModule, FormsModule],
  templateUrl: './vip-customers.html',
  styleUrl: './vip-customers.css',
})
export class VipCustomers implements OnInit {
  vipList: any[] = [];
  topN: number = 5;
  selectedRow: string = '';
  employeeName: string = '';
  totalPurchase: number = 0;

  constructor(
    private statisticsService: StatisticsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Q12: Chỉ nhân viên mới được xem
    if (!this.authService.isLoggedIn() || !this.authService.isEmployee()) {
      alert('Chỉ nhân viên mới có thể xem danh sách khách VIP!');
      this.router.navigate(['/login']); return;
    }
    this.employeeName = this.authService.getUserName();
    this.loadVip();
  }

  // Q12: Load top N khách hàng theo tổng chi tiêu từ backend
  loadVip() {
    this.statisticsService.getVipCustomers(this.topN).subscribe({
      next: (data) => {
        this.vipList = data;
        this.totalPurchase = data.reduce((sum: number, c: any) => sum + (c.TotalPurchase || 0), 0);
      },
      error: () => { this.vipList = []; }
    });
  }

  // Trả về huy hiệu hạng dựa vào vị trí
  getRankBadge(index: number): string {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  }

  getRankClass(index: number): string {
    if (index === 0) return 'rank-gold';
    if (index === 1) return 'rank-silver';
    if (index === 2) return 'rank-bronze';
    return '';
  }

  selectRow(id: string) { this.selectedRow = id; }
  isSelected(id: string): boolean { return this.selectedRow === id; }
  formatPrice(p: number): string { return (p || 0).toLocaleString('vi-VN') + ' đ'; }
  goBack() { this.router.navigate(['/shopping']); }
}
