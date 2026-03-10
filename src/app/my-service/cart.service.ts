import { Injectable } from '@angular/core';

export interface CartItem {
  ProductId: string;
  ProductName: string;
  Price: number;
  Image: string;
  Quantity: number;
  SubTotal: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: CartItem[] = [];

  // Thêm sản phẩm vào giỏ hàng
  // Nếu sản phẩm đã tồn tại → tăng số lượng
  // Nếu chưa có → thêm mới
  addToCart(product: any, quantity: number): void {
    let existItem = this.cartItems.find(item => item.ProductId === product.ProductId);
    if (existItem) {
      existItem.Quantity += quantity;
      existItem.SubTotal = existItem.Quantity * existItem.Price;
    } else {
      this.cartItems.push({
        ProductId: product.ProductId,
        ProductName: product.ProductName,
        Price: product.Price,
        Image: product.Image || '',
        Quantity: quantity,
        SubTotal: product.Price * quantity
      });
    }
  }

  // Lấy toàn bộ giỏ hàng
  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  // Cập nhật số lượng
  updateQuantity(productId: string, quantity: number): void {
    let item = this.cartItems.find(i => i.ProductId === productId);
    if (item) {
      item.Quantity = quantity;
      item.SubTotal = item.Price * quantity;
    }
  }

  // Xóa một sản phẩm khỏi giỏ hàng
  removeItem(productId: string): void {
    this.cartItems = this.cartItems.filter(i => i.ProductId !== productId);
  }

  // Tính tổng tiền
  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.SubTotal, 0);
  }

  // Đếm số lượng loại sản phẩm trong giỏ
  getCount(): number {
    return this.cartItems.length;
  }

  // Xóa toàn bộ giỏ hàng (sau khi thanh toán)
  clearCart(): void {
    this.cartItems = [];
  }
}
