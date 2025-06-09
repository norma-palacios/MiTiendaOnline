import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService, Producto } from '../servicios/productos.service';

@Component({
  standalone: true,
  selector: 'app-inicio',
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class Inicio implements OnInit {

  textoBusqueda: string = '';
  categoriaSeleccionada: string = '';
  dropdownAbierto: boolean = false;
  productosOriginales: Producto[] = [];
  productos: Producto[] = [];
  categorias: string[] = [];

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe(data => {
      this.productosOriginales = data
      this.productos = data;
    });

    this.productosService.obtenerCategorias().subscribe(cats => {
      this.categorias = cats;
    });
  }

  toggleDropdown(): void {
    this.dropdownAbierto = !this.dropdownAbierto;
  }

  seleccionarCategoria(cat: string, event: MouseEvent): void {
    event.stopImmediatePropagation();
    this.categoriaSeleccionada = cat;
    this.aplicarFiltros();
    this.toggleDropdown();
  }

  aplicarFiltros(): void {
    const categoria = this.categoriaSeleccionada.toLowerCase();
    const texto = this.textoBusqueda.toLowerCase();

    this.productos = this.productosOriginales.filter(p => {
      const coincideCategoria = !categoria || p.category.toLowerCase() === categoria;
      const coincideTexto = !texto || p.title.toLowerCase().includes(texto);
      return coincideCategoria && coincideTexto;
    });
  }
}
