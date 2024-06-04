import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { ModalCompraRealizadaComponent } from '../../elementos/modal-compra-realizada/modal-compra-realizada.component';

@Component({
  selector: 'app-metodo-pago',
  standalone: true,
  imports: [MatFormFieldModule],
  templateUrl: './metodo-pago.component.html',
  styleUrl: './metodo-pago.component.css'
})
export class MetodoPagoComponent {

  constructor(private dialog: MatDialog) { }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalCompraRealizadaComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      // Redirigir al inicio después de cerrar el modal
      window.location.href = '/inicio';
    });
  }
}