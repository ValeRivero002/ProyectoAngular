import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/product';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
 productoService: ProductoService = inject(ProductoService);
 carritoService: CarritoService = inject(CarritoService);
 detalleProducto:Producto | undefined;
 constructor() {
   const idProducto = Number(this.route.snapshot.params['id']);
   this.productoService.obtenerProductoPorId(idProducto).subscribe(
    data => this.detalleProducto = data
   )
 }
 agregarAlCarrito(): void {
  if (this.detalleProducto) {
    this.carritoService.agregarAlCarrito(this.detalleProducto);
    alert('Producto añadido al carrito');
  }
}

}
