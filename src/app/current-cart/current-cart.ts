import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../my-service/cart.service';
import { AuthService } from '../my-service/auth.service';

@Component({
  selector: 'app-current-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './current-cart.html',
  styleUrl: './current-cart.css',
})
export class CurrentCart implements OnInit {
  cartItems: CartItem[] = [];
  message: string = '';
  selectedRow: string = '';

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn() || !this.authService.isCustomer()) {
      alert('Bạn cần đăng nhập để xem giỏ hàng!');
      this.router.navigate(['/login']); return;
    }
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
  }

  selectRow(id: string) { this.selectedRow = id; }
  isRowSelected(id: string): boolean { return this.selectedRow === id; }

  updateQty(item: CartItem, qty: number) {
    if (qty < 1) { alert('Số lượng phải >= 1'); return; }
    this.cartService.updateQuantity(item.ProductId, qty);
    this.loadCart();
    this.message = '✅ Đã cập nhật số lượng!';
    setTimeout(() => this.message = '', 2000);
  }

  removeItem(item: CartItem) {
    if (!confirm(`Xóa "${item.ProductName}" khỏi giỏ hàng?`)) return;
    this.cartService.removeItem(item.ProductId);
    this.loadCart();
    this.message = '✅ Đã xóa sản phẩm!';
    setTimeout(() => this.message = '', 2000);
  }

  checkout() {
    if (this.cartItems.length === 0) { alert('Giỏ hàng trống!'); return; }
    if (!confirm(`Xác nhận thanh toán tổng cộng ${this.formatPrice(this.getTotal())}?`)) return;
    this.cartService.clearCart();
    this.cartItems = [];
    this.message = '✅ Thanh toán thành công! Cảm ơn bạn đã mua hàng tại Panda Store! 🐼';
  }

  getTotal(): number { return this.cartService.getTotal(); }
  formatPrice(p: number): string { return p.toLocaleString('vi-VN') + ' đ'; }
  goBack() { this.router.navigate(['/shopping']); }
  goShopping() { this.router.navigate(['/shopping']); }
}
