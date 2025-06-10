import { Component, OnDestroy, OnInit } from '@angular/core';
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

  //carousel
  indiceActual: number = 0;
  imagenes: string[] = [
    'assets/img/logo1.png',
    'assets/img/logo2.png',
    'assets/img/logo3.png'
  ];

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


  siguiente(): void {
    this.indiceActual = (this.indiceActual + 1) % this.imagenes.length;
  }

  anterior(): void {
    this.indiceActual = (this.indiceActual - 1 + this.imagenes.length) % this.imagenes.length;
  }


  toggleDropdown(): void {
    this.dropdownAbierto = !this.dropdownAbierto;
  }

  seleccionarCategoria(cat: string, event: MouseEvent): void {
    //event.stopImmediatePropagation();
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
