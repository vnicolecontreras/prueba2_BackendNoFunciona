import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutenticacionService } from './autenticacion.service';
import { Product } from '../Interfaces/producto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoSService {

  private apiUrl = 'https://dummyjson.com/auth/products';

  constructor(
    private http: HttpClient,
    private autenticacionS: AutenticacionService
  ) { }

  obtener_productos_s(skip: number = 0): Observable<{ products: Product[], total: number, skip: number, limit: number }> {
    const headers = this.autenticacionS.obtener_header(); // Incluye el token en la cabecera
    return this.http.get<{ products: Product[], total: number, skip: number, limit: number }>(`${this.apiUrl}?skip=${skip}&limit=30`, { headers });
  }
}
