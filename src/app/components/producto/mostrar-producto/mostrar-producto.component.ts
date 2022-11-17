import { Component, OnInit } from '@angular/core';
import { ProductoI } from 'src/app/models/productos';
import { Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service'
import {Message,MessageService} from 'primeng/api';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { TipoProductoI } from 'src/app/models/tipoproducto';


@Component({
  selector: 'app-mostrar-producto',
  templateUrl: './mostrar-producto.component.html',
  styleUrls: ['./mostrar-producto.component.css'],

})
export class MostrarProductoComponent implements OnInit {
  public productos:ProductoI[]= [];
  public tipoProductos:TipoProductoI[]= [];
  public msgs1: Message[]=[];

  constructor(
    private productoService: ProductoService,
    private tipoProductoService: TipoProductoService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.mostrarProductos()
  }

  mostrarProductos() {
    this.tipoProductoService.getAllTipoProducto()
      .subscribe({
        next: (data:any) => {
          this.tipoProductos = data;
        }
      })
    this.productoService.getAllProducto()
      .subscribe({
        next: (data:any) => {

          data.forEach((e1:any) => {
            this.tipoProductos.forEach(e2 => {
              if(e1.tipoProducto == e2.id ){
                  e1.tipoProducto = e2.nombreTipoProducto;
              }
            })
          })
          this.productos =data;
          // this.tipoProductoService.getOneTipoProducto(data.tipoProducto)
          //   .subscribe({
          //     next: (resp:any) => {
                
          //       this.productos.push(resp.nombreTipoProducto)
          //     }
          //   })  
        }
      })
    
    
  }

  eliminar(id: number): void{
    this.router.navigateByUrl('/productos');
    this.productoService.deleteProducto(id).subscribe(
      () => {
        this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Producto Eliminado', life:5000});
        this.mostrarProductos();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/productos');

      }
    );
  }

  imprimir(id: number){

  }

}
