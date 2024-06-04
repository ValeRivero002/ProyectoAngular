import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-modal-compra-realizada',
  templateUrl: './modal-compra-realizada.component.html',
  styleUrls: ['./modal-compra-realizada.component.css']
})
export class ModalCompraRealizadaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalCompraRealizadaComponent>,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
  }

  cerrarModal(): void {
    // Vaciar el carrito al cerrar el modal
    this.carritoService.limpiarCarrito();
    // Cerrar el modal
    this.dialogRef.close();
  }
}
