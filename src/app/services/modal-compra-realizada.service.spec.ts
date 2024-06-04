import { TestBed } from '@angular/core/testing';

import { ModalCompraRealizadaService } from './modal-compra-realizada.service';

describe('ModalCompraRealizadaService', () => {
  let service: ModalCompraRealizadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalCompraRealizadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
