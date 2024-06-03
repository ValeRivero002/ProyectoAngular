import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Producto[] = [];

  agregarAlCarrito(producto: Producto): void {
    this.carrito.push(producto);
  }

  obtenerCarrito(): Producto[] {
    return this.carrito;
  }

  limpiarCarrito(): void {
    this.carrito = [];
  }

  eliminarDelCarrito(id: number): void {
    this.carrito = this.carrito.filter(producto => producto.id !== id);
  }
}
