// modal-compra-realizada.service.ts

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCompraRealizadaComponent } from '../elementos/modal-compra-realizada/modal-compra-realizada.component';


@Injectable({
  providedIn: 'root'
})
export class ModalCompraRealizadaService {

  constructor(private dialog: MatDialog) { }

  openConfirmationModal(): void {
    this.dialog.open(ModalCompraRealizadaComponent, {
      width: '400px',
    });
  }
}
