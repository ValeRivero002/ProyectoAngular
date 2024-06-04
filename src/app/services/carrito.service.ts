import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/product';
import { BehaviorSubject, Observable } from 'rxjs';

interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: CarritoItem[] = [];
  private carritoSubject: BehaviorSubject<CarritoItem[]> = new BehaviorSubject<CarritoItem[]>([]);
  agregarAlCarrito(producto: Producto): void {
    const item = this.carrito.find(item => item.producto.id === producto.id);
    if (item) {
      item.cantidad++;
    } else {
      this.carrito.push({ producto, cantidad: 1 });
      this.carritoSubject.next(this.carrito);
    }
  }

  obtenerCarrito(): CarritoItem[] {
    return this.carrito;
  }

  limpiarCarrito(): void {
    this.carrito = [];
  }

  eliminarDelCarrito(id: number): void {
    this.carrito = this.carrito.filter(item => item.producto.id !== id);
  }

  actualizarCantidad(id: number, cantidad: number): void {
    const item = this.carrito.find(item => item.producto.id === id);
    if (item && cantidad > 0) {
      item.cantidad = cantidad;
    }
  }
  carritoCambios(): Observable<CarritoItem[]> {
    return this.carritoSubject.asObservable();
  }
}
