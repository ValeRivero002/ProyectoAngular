import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-menu-categoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-categoria.component.html',
  styleUrls: ['./menu-categoria.component.scss']
})
export class MenuCategoriaComponent implements OnInit {
  categories: string[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.obtenerCategorias().subscribe(categories => {
      this.categories = categories;
    });
  }

  onCategorySelected(category: string): void {
    this.categorySelected.emit(category);
  }
}
