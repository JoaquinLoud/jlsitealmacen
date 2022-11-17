import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VentaI } from '../models/ventas';
import { ProductoI, VentaProductoI } from '../models/productos';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  api_uri_nodejs = 'http://localhost:4000';
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/ventas/`
  constructor(
    private http:HttpClient

  ) {}

  getAllVenta():Observable<VentaI[]>{
    return this.http
      .get<VentaI[]>(this.base_path)
  }

  getAllVentaProducto():Observable<VentaProductoI[]>{
    return this.http
      .get<VentaProductoI[]>(`${this.base_path}ventaproducto/mostrar`)
  }
  getOneVenta(id: number):Observable<VentaI[]>{
    return this.http
      .get<VentaI[]>(`${this.base_path}${id}`)
  }

  createVenta(data: any):Observable<VentaI>{
    return this.http.post<VentaI>(`${this.base_path}crear`, data)
  }

  createVentaProducto(data: any):Observable<VentaProductoI[]>{
    return this.http.post<VentaProductoI[]>(`${this.base_path}ventaproducto`, data)
  }


  updateVenta(id: number, data: VentaI): Observable<VentaI> {
    return this.http.put<VentaI>(`${this.base_path}${id}`, data);
  }

  deleteVenta(id: number): Observable<VentaI> {
    return this.http.delete<VentaI>(`${this.base_path}${id}`);
  }


}
