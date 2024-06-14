import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosReviewComponent } from './producto-review.component';

describe('ProductoReviewComponent', () => {
  let component: ProductosReviewComponent;
  let fixture: ComponentFixture<ProductosReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
