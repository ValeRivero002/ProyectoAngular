import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatIconModule,MatCardModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  constructor(private router: Router) {}

  navegarATienda() {
    this.router.navigate(['/tienda']);
  }

  navegarACategoria(categoria: string) {
    this.router.navigate(['/tienda', { categoria }]);
  }
}
