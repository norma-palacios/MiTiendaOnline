import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../servicios/carrito.service';

@Component({
  selector: 'app-carrito-modal', // Confirma que el selector es correcto
  imports: [CommonModule],
  templateUrl: './carrito-modal.component.html',
})

export class CarritoModalComponent {
  mostrarCarrito = false;

  constructor(public carritoService: CarritoService) {}

  abrirCarrito() {
    this.mostrarCarrito = true;
  }

  cerrarCarrito() {
    this.mostrarCarrito = false;
  }

  eliminarDelCarrito(producto: any) {
  this.carritoService.eliminarProducto(producto);
}
}