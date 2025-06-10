import { Component } from '@angular/core';
import { CarritoService } from '../servicios/carrito.service';

@Component({
  selector: 'app-carrito-modal', // Confirma que el selector es correcto
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