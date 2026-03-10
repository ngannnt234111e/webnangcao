import { Routes } from '@angular/router';
import { Shopping } from './shopping/shopping';
import { CurrentCart } from './current-cart/current-cart';
import { RevenueStatistics } from './revenue-statistics/revenue-statistics';
import { VipCustomers } from './vip-customers/vip-customers';
import { Login } from './login/login';
import { About } from './about/about';

export const routes: Routes = [
  { path: '', redirectTo: '/shopping', pathMatch: 'full' },
  { path: 'shopping', component: Shopping },
  { path: 'current-cart', component: CurrentCart },
  { path: 'revenue-statistics', component: RevenueStatistics },
  { path: 'vip-customers', component: VipCustomers },
  { path: 'login', component: Login },
  { path: 'about', component: About },
];
