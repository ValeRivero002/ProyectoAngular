import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/product';
import { CarritoService } from '../../services/carrito.service';
import { ProductosReviewComponent } from '../../elementos/producto-review/producto-review.component';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
  standalone: true,
  imports: [CommonModule, ProductosReviewComponent]
})
export class DetallesComponent implements OnInit {
  detalleProducto: Producto | undefined;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    const idProducto = Number(this.route.snapshot.params['id']);
    this.productoService.obtenerProductoPorId(idProducto).subscribe(
      data => {
        this.detalleProducto = data;
      },
      error => {
        console.error('Error al cargar el producto:', error);
      }
    );
  }

  agregarAlCarrito(): void {
    if (this.detalleProducto) {
      this.carritoService.agregarAlCarrito(this.detalleProducto);
      alert('Producto añadido al carrito');
    }
  }
}
