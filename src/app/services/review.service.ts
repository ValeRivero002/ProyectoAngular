// review.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../interfaces/reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000/reviews';

  constructor(private http: HttpClient) { }
  obtenerReviewsPorProducto(productId: number): Observable<Review[]> {
    console.log('Fetching reviews from API for product ID:', productId); 
    return this.http.get<Review[]>(`${this.apiUrl}?productId=${productId}`);
  }
}
