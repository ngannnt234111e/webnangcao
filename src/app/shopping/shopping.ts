import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../my-service/product.service';
import { CartService } from '../my-service/cart.service';
import { AuthService } from '../my-service/auth.service';

@Component({
  selector: 'app-shopping',
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping.html',
  styleUrl: './shopping.css',
})
export class Shopping implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;
  buyQty: number = 1;
  message: string = '';
  minPrice: number = 0;
  maxPrice: number = 999999999;
  searchModel: string = '';
  searchMadeBy: string = '';
  sortOrder: string = 'asc';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void { this.loadProducts(); }

  loadProducts() {
    this.productService.getAll().subscribe(data => { this.products = data; });
  }

  selectProduct(p: any) {
    this.selectedProduct = p; this.buyQty = 1; this.message = '';
  }

  isSelected(p: any): boolean {
    return this.selectedProduct && this.selectedProduct.ProductId === p.ProductId;
  }

  searchByPrice() {
    this.productService.searchByPrice(this.minPrice, this.maxPrice).subscribe(data => {
      this.products = data; this.selectedProduct = null;
    });
  }

  searchByModel() {
    this.productService.searchByModel(this.searchModel).subscribe(data => {
      this.products = data; this.selectedProduct = null;
    });
  }

  searchByMadeBy() {
    this.productService.searchByMadeBy(this.searchMadeBy).subscribe(data => {
      this.products = data; this.selectedProduct = null;
    });
  }

  sortProducts() {
    this.productService.sortByPrice(this.sortOrder).subscribe(data => {
      this.products = data; this.selectedProduct = null;
    });
  }

  resetSearch() {
    this.searchModel = ''; this.searchMadeBy = '';
    this.minPrice = 0; this.maxPrice = 999999999;
    this.loadProducts(); this.selectedProduct = null;
  }

  addToCart() {
    if (!this.authService.isLoggedIn()) {
      alert('Bạn cần đăng nhập để mua hàng!');
      this.router.navigate(['/login']); return;
    }
    if (!this.authService.isCustomer()) { alert('Chỉ khách hàng mới có thể mua hàng!'); return; }
    if (!this.selectedProduct) { alert('Vui lòng chọn sản phẩm!'); return; }
    if (this.buyQty < 1) { alert('Số lượng phải >= 1!'); return; }

    // Thêm vào CartService (local array)
    this.cartService.addToCart(this.selectedProduct, this.buyQty);
    this.message = `✅ Đã thêm "${this.selectedProduct.ProductName}" (x${this.buyQty}) vào giỏ hàng!`;
    setTimeout(() => this.message = '', 3000);
  }

  formatPrice(p: number): string { return p.toLocaleString('vi-VN') + ' đ'; }

  getProductImage(p: any): string {
    const name = (p.ProductName || '').toLowerCase();
    const cat = (p.CategoryId || '').toLowerCase();
    if (name.includes('airpod') || name.includes('tai nghe'))
      return 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=200&fit=crop';
    if (name.includes('watch') || name.includes('đồng hồ') || cat === 'cat5')
      return 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=200&fit=crop';
    if (name.includes('ipad') || name.includes('tab') || name.includes('tablet') || cat === 'cat3')
      return 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop';
    if (name.includes('macbook'))
      return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop';
    if (name.includes('laptop') || name.includes('xps') || name.includes('surface') || cat === 'cat2')
      return 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=300&h=200&fit=crop';
    if (name.includes('iphone'))
      return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop';
    if (name.includes('samsung galaxy s'))
      return 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=300&h=200&fit=crop';
    if (name.includes('xiaomi'))
      return 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=200&fit=crop';
    return 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop';
  }
}
