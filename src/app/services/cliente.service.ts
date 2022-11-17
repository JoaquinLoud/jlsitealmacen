import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteI,VendedorI } from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  api_uri_nodejs = 'http://localhost:4000';
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/clientes/`
  constructor(
    private http:HttpClient

  ) {}

  getAllCliente():Observable<ClienteI[]>{
    return this.http
      .get<ClienteI[]>(this.base_path)
  }
  getAllVendedor():Observable<VendedorI[]>{
    return this.http
      .get<VendedorI[]>(`${this.base_path}vendedores`)
  }

  getOneCliente(id: number):Observable<ClienteI[]>{
    return this.http
      .get<ClienteI[]>(`${this.base_path}${id}`)
  }

  createCliente(data: any):Observable<ClienteI>{
    return this.http.post<ClienteI>(this.base_path, data)
  }

  updateCliente(id: number, data: ClienteI): Observable<ClienteI> {
    return this.http.put<ClienteI>(`${this.base_path}${id}`, data);
  }

  deleteCliente(id: number): Observable<ClienteI> {
    return this.http.delete<ClienteI>(`${this.base_path}${id}`);
  }


}
