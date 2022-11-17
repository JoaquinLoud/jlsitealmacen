import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductoService } from 'src/app/services/producto.service';
import { ProductoI } from 'src/app/models/productos';
import {Message,MessageService} from 'primeng/api';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { TipoProductoI } from 'src/app/models/tipoproducto';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {
  public id: number =0;
  public form:FormGroup=this.formBuilder.group({
    id: [''],
    nombreProducto: ['', [Validators.required]],
    marcaProducto: ['', [Validators.required]],
    precioProducto: ['', [Validators.required]],
    stockminProducto: ['', [Validators.required]],
    cantidadProducto: ['', [Validators.required]],
    tipoProducto: ['', [Validators.required]],


  });
  public productoSeleccionado: TipoProductoI = {nombreTipoProducto: "Dilan"};

  public tipoProductos:TipoProductoI[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private tipoProductoService: TipoProductoService,
    private messageService: MessageService,   
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getProducto(this.id);
    this.tipoProductoService.getAllTipoProducto()
      .subscribe({
        next: (data:any) => {
          this.tipoProductos = data;
          console.log("data")
          console.log(data)
          console.log("data")
        }
      })

  }



  getProducto(id: number){
    this.productoService.getOneProducto(id)
    .subscribe({
      next: (data:any) => {
        this.form.setValue(data)        
        this.tipoProductoService.getOneTipoProducto(data.tipoProducto).subscribe({
          next: (data) => {
            this.productoSeleccionado = data;
          }
        })
      }
    })
  }

  onSubmit(): void {
    this.form.value.tipoProducto = this.form.value.tipoProducto.id;
    const formValue: ProductoI = this.form.value;
    const id: number =  this.form.value.id
    this.productoService.updateProducto(id, formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');
        setTimeout(()=>{                  
          this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Producto Actualizado', life:5000});

     }, 0);
        this.router.navigateByUrl('productos');

      },
      err => {

        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/productos');
  }

  get nombreProducto() { return this.form.get('nombreProducto'); }
  get marcaProducto() { return this.form.get('marcaProducto'); }
  get precioProducto() { return this.form.get('precioProducto'); }
  get stockminProducto() { return this.form.get('stockminProducto'); }
  get cantidadProducto() { return this.form.get('cantidadProducto'); }
  get tipoProducto() { return this.form.get('tipoProducto'); }

}
