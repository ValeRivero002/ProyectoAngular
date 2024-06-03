import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoComponent } from '../../elementos/producto/producto.component';
import { Producto } from '../../interfaces/product';
import { ProductoService } from '../../services/producto.service';
import { MenuCategoriaComponent } from '../../elementos/menu-categoria/menu-categoria.component';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductoComponent,
    MenuCategoriaComponent
  ],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent {
  listaDeProductos: Producto[] = [];
  listaFiltradaDeProductos: Producto[] = [];
  productoService: ProductoService = inject(ProductoService);
  selectedCategory: string | null = null;
  searchTerm: string = '';

  constructor() {
    this.loadProducts();
  }

  loadProducts(): void {
    if (this.selectedCategory) {
      this.productoService.obtenerProductosPorCategoria(this.selectedCategory).subscribe(
        data => {
          this.listaDeProductos = data;
          this.filtrarProductos();
        },
        error => console.log('Hay un Error'),
        () => console.log('Fin'),
      );
    } else {
      this.productoService.obtenerTodosLosProductos().subscribe(
        data => {
          this.listaDeProductos = data;
          this.filtrarProductos();
        },
        error => console.log('Hay un Error'),
        () => console.log('Fin'),
      );
    }
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
    this.loadProducts();
  }

  onSearch(): void {
    this.filtrarProductos();
  }

  filtrarProductos(): void {
    if (this.searchTerm) {
      this.listaFiltradaDeProductos = this.listaDeProductos.filter(producto =>
        producto.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.listaFiltradaDeProductos = this.listaDeProductos;
    }
  }
  trackById(index: number, item: Producto): number {
    return item.id;
  }
}
