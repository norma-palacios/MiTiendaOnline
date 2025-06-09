import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiBaseUrl = 'https://fakestoreapi.com/';

  constructor(private http: HttpClient) {}

  obtenerCategorias(): Observable<string[]> {
    return this.http.get<string[]>(this.apiBaseUrl + 'products/categories');
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiBaseUrl + 'products');
  }
}