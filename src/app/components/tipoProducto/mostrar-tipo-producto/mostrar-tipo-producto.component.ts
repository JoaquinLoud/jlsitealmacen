import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Message,MessageService} from 'primeng/api';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { TipoProductoI } from 'src/app/models/tipoproducto';


@Component({
  selector: 'app-mostrar-tipo-producto',
  templateUrl: './mostrar-tipo-producto.component.html',
  styleUrls: ['./mostrar-tipo-producto.component.css'],

})
export class MostrarTipoProductoComponent implements OnInit {
  public tipoProductos:TipoProductoI[]= [];
  public msgs1: Message[]=[];

  constructor(
    private tipoProductoService: TipoProductoService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.mostrarTipoProductos()
  }

  mostrarTipoProductos() {
    this.tipoProductoService.getAllTipoProducto()
      .subscribe({
        next: (data:any) => {
          this.tipoProductos = data;
        }
      })
  
    
    
  }

  eliminar(id: number): void{
    console.log("id")
    console.log(id)
    console.log("id")
    this.router.navigateByUrl('/tipoproductos');
    this.tipoProductoService.deleteTipoProducto(id).subscribe(
      () => {
        this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Categoria Eliminada', life:5000});
        this.mostrarTipoProductos();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/tipoproductos');

      }
    );
  }

  imprimir(id: number){

  }

}
