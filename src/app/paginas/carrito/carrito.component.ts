import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../interfaces/product';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  carritoService: CarritoService = inject(CarritoService);
  carrito: Producto[] = [];
  total: number = 0;

  constructor() {
    this.carrito = this.carritoService.obtenerCarrito();
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.total = this.carrito.reduce((sum, producto) => sum + producto.price, 0);
  }

  limpiarCarrito(): void {
    this.carritoService.limpiarCarrito();
    this.carrito = [];
    this.total = 0;
  }

  eliminarProducto(id: number): void {
    this.carritoService.eliminarDelCarrito(id);
    this.carrito = this.carritoService.obtenerCarrito();
    this.calcularTotal();
  }

  trackById(index: number, item: Producto): number {
    return item.id;
  }
}
