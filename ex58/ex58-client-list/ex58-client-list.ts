import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fashion } from '../fashion.model';
import { Ex58Fashion } from '../ex58-fashion';

@Component({
  selector: 'app-ex58-client-list',
  standalone: false,
  templateUrl: './ex58-client-list.html',
  styleUrl: './ex58-client-list.css',
})
export class Ex58ClientList implements OnInit {
  groupedFashions: { style: string; items: Fashion[] }[] = [];
  styles: string[] = [];
  selectedStyle: string = '';
  searchStyle: string = '';
  loading = true;

  constructor(private service: Ex58Fashion, private router: Router) {}

  ngOnInit(): void {
    this.service.getStyles().subscribe({ next: (s) => (this.styles = s), error: () => {} });
    this.loadFashions();
  }

  loadFashions(style?: string): void {
    this.loading = true;
    this.service.getAllFashions(style).subscribe({
      next: (data) => {
        this.groupedFashions = this.groupByStyle(data);
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  groupByStyle(fashions: Fashion[]): { style: string; items: Fashion[] }[] {
    const map = new Map<string, Fashion[]>();
    fashions.forEach((f) => {
      if (!map.has(f.fashion_style)) map.set(f.fashion_style, []);
      map.get(f.fashion_style)!.push(f);
    });
    return Array.from(map.entries()).map(([style, items]) => ({ style, items }));
  }

  onSearch(): void {
    this.loadFashions(this.searchStyle.trim() || this.selectedStyle || undefined);
  }

  onStyleChange(): void {
    this.searchStyle = '';
    this.loadFashions(this.selectedStyle || undefined);
  }

  clearFilter(): void {
    this.selectedStyle = '';
    this.searchStyle = '';
    this.loadFashions();
  }

  viewDetail(id: string): void {
    this.router.navigate(['/ex58-client', id]);
  }
}
