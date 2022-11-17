import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductoI } from 'src/app/models/productos';
import {Message,MessageService} from 'primeng/api';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { TipoProductoI } from 'src/app/models/tipoproducto';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  public form:FormGroup=this.formBuilder.group({
    nombreProducto: ['', [Validators.required]],
    marcaProducto: ['', [Validators.required]],
    precioProducto: ['', [Validators.required]],
    stockminProducto: ['', [Validators.required]],
    cantidadProducto: ['', [Validators.required]],
    tipoProducto: ['', [Validators.required]],

  });

  public tipoProductos:TipoProductoI[] = [];
  public seleccionarTipo: any ;

  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private tipoProductoService: TipoProductoService,
    private messageService: MessageService,

    private router: Router,
  ) { }

  ngOnInit(): void {

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

  onSubmit(): void {
    this.form.value.tipoProducto = this.form.value.tipoProducto.id;
    const formValue: ProductoI = this.form.value;

    this.productoService.createProducto(formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');

        setTimeout(()=>{                  
          this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Producto Creado', life:5000});

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
