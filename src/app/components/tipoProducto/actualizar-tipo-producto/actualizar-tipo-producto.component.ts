import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductoService } from 'src/app/services/producto.service';
import { ProductoI } from 'src/app/models/productos';
import {Message,MessageService} from 'primeng/api';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { TipoProductoI } from 'src/app/models/tipoproducto';

@Component({
  selector: 'app-actualizar-tipo-producto',
  templateUrl: './actualizar-tipo-producto.component.html',
  styleUrls: ['./actualizar-tipo-producto.component.css']
})
export class ActualizarTipoProductoComponent implements OnInit {
  public id: number =0;
  public form:FormGroup=this.formBuilder.group({
    id: [''],
    nombreTipoProducto: ['', [Validators.required]],
   


  });
  public productoSeleccionado: TipoProductoI = {nombreTipoProducto: ""};

  public tipoProductos:TipoProductoI[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private tipoProductoService: TipoProductoService,
    private messageService: MessageService,   
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getTipoProducto(this.id);
   

  }

  getTipoProducto(id: number){
    this.tipoProductoService.getOneTipoProducto(id)
    .subscribe({
      next: (data:any) => {
        this.form.setValue(data)        
      }
    })
  }

  onSubmit(): void {
    const formValue: TipoProductoI = this.form.value;
    const id: number =  this.form.value.id
    this.tipoProductoService.updateTipoProducto(id, formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');
        setTimeout(()=>{                  
          this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Producto Actualizado', life:5000});

     }, 0);
        this.router.navigateByUrl('/tipoproductos');

      },
      err => {

        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/tipoproductos');
  }

  get nombreTipoProducto() { return this.form.get('nombreTipoProducto'); }


}
