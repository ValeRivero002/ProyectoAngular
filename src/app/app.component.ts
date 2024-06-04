import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CarritoService } from './services/carrito.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  carritoCantidad: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoService.carritoCambios().subscribe(() => {
      this.actualizarCarritoCantidad();
    });
  }

  actualizarCarritoCantidad(): void {
    const carrito = this.carritoService.obtenerCarrito();
    this.carritoCantidad = carrito.reduce((total, item) => total + item.cantidad, 0);
  }
}