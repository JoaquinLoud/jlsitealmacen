import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Message,MessageService} from 'primeng/api';
import { VentaService } from 'src/app/services/venta.service';
import { VentaI } from 'src/app/models/ventas';
import { ClienteService } from 'src/app/services/cliente.service';
import { Subscription } from 'rxjs';
import { VentaProductoI } from 'src/app/models/productos';


@Component({
  selector: 'app-productos-comprados',
  templateUrl: './productos-comprados.component.html',
  styleUrls: ['./productos-comprados.component.css'],

})
export class ProductosCompradosComponent implements OnInit {
  public ventas:any= [];
  public msgs1: Message[]=[];

  constructor(
    private ventaService: VentaService,
    private ClienteService: ClienteService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  
    this.ventaService.getAllVentaProducto().subscribe({
      next: resp => {
        this.route.params.subscribe(params => {

          resp.forEach((element:any) => {
            if(element.venta.cliente.id === parseInt(params['id'] )){
              this.ventas.push(element)
            }

          })

          console.log(this.ventas)
        });
       
      }
    })

  }

  

}
