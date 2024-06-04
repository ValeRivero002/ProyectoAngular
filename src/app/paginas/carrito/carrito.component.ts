import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../interfaces/product';
import { Router } from '@angular/router';

interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  carritoService: CarritoService = inject(CarritoService);
  carrito: CarritoItem[] = [];
  total: number = 0;

  constructor(private router: Router) {
    this.carrito = this.carritoService.obtenerCarrito();
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.total = this.carrito.reduce((sum, item) => sum + item.producto.price * item.cantidad, 0);
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

  actualizarCantidad(id: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const cantidadNumerica = Number(inputElement.value);
    if (!isNaN(cantidadNumerica) && cantidadNumerica > 0) {
      this.carritoService.actualizarCantidad(id, cantidadNumerica);
      this.carrito = this.carritoService.obtenerCarrito();
      this.calcularTotal();
    }
  }
  redirectToMetodoPago(): void {
    this.router.navigate(['/metodo-pago']);
  }

  trackById(index: number, item: CarritoItem): number {
    return item.producto.id;
  }
}
