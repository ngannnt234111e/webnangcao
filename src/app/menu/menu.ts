import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../my-service/auth.service';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit {
  showCartMenu = false;
  userName = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
  }

  isLoggedIn(): boolean {
    this.userName = this.authService.getUserName();
    return this.authService.isLoggedIn();
  }

  toggleCartMenu() { this.showCartMenu = !this.showCartMenu; }

  logout() {
    this.authService.logout();
    this.userName = '';
    this.router.navigate(['/login']);  // Q13: sau khi logout → về trang login
  }

  goToLogin() { this.router.navigate(['/login']); }
}
