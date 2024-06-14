import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../interfaces/reviews';

@Component({
  selector: 'app-producto-review',
  templateUrl: './producto-review.component.html',
  styleUrls: ['./producto-review.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductosReviewComponent implements OnInit, OnChanges {
  @Input() productId: number = 0;
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviewsByProductId(this.productId);
  }

  ngOnChanges(): void {
    this.loadReviewsByProductId(this.productId);
  }

  loadReviewsByProductId(productId: number): void {
    if (productId) {
      this.reviewService.obtenerReviewsPorProducto(productId).subscribe(
        reviews => {
          this.reviews = reviews;
        },
        error => {
          console.error('Error loading reviews:', error);
        }
      );
    }
  }
}
