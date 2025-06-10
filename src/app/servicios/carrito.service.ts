import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private productos: any[] = [];
  private total = 0;

  agregarProducto(producto: any) {
    this.productos.push(producto);
    this.actualizarTotal();
  }

  //COdigo agregado
  eliminarProducto(producto: any) {
  const index = this.productos.indexOf(producto);
  if (index > -1) {
    this.productos.splice(index, 1);
  }
  this.actualizarTotal();
}
  // ****

  obtenerCarrito() {
    return this.productos;
  }

  obtenerTotal() {
    return this.productos.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  }

  private actualizarTotal() {
    this.total = this.productos.reduce((sum, item) => sum + item.price, 0);
  }
}