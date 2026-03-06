import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fashion } from '../fashion.model';
import { Ex58Fashion } from '../ex58-fashion';

@Component({
  selector: 'app-ex58-client-detail',
  standalone: false,
  templateUrl: './ex58-client-detail.html',
  styleUrl: './ex58-client-detail.css',
})
export class Ex58ClientDetail implements OnInit {
  fashion: Fashion | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: Ex58Fashion,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getFashionById(id).subscribe({
        next: (data) => {
          this.fashion = data;
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/ex58-client']);
  }
}
