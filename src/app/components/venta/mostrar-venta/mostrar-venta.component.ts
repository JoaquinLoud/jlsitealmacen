import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Message,MessageService} from 'primeng/api';
import { VentaService } from 'src/app/services/venta.service';
import { VentaI } from 'src/app/models/ventas';
import { ClienteService } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-mostrar-venta',
  templateUrl: './mostrar-venta.component.html',
  styleUrls: ['./mostrar-venta.component.css'],

})
export class MostrarVentaComponent implements OnInit {
  public ventas:VentaI[]= [];
  public msgs1: Message[]=[];

  constructor(
    private ventaService: VentaService,
    private ClienteService: ClienteService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.mostrarVentas()
  }

  mostrarVentas() {
      
    this.ventaService.getAllVenta()
      .subscribe({
        next: (data:any) => {
          this.ventas = data;
        }
      })

    
    
  }

  eliminar(id: number): void{
    this.router.navigateByUrl('/ventas');
    this.ventaService.deleteVenta(id).subscribe(
      () => {
        this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Venta Eliminado', life:5000});
        this.mostrarVentas();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/ventas');

      }
    );
  }

  imprimir(id: number){

  }

}
