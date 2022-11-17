import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Message,MessageService} from 'primeng/api';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { TipoProductoI } from 'src/app/models/tipoproducto';

@Component({
  selector: 'app-crear-tipo-producto',
  templateUrl: './crear-tipo-producto.component.html',
  styleUrls: ['./crear-tipo-producto.component.css']
})
export class CrearTipoProductoComponent implements OnInit {

  public form:FormGroup=this.formBuilder.group({
    nombreTipoProducto: ['', [Validators.required]],

  });


  constructor(
    private formBuilder: FormBuilder,
    private tipoProductoService: TipoProductoService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  
  }

  onSubmit(): void {
    const formValue: TipoProductoI = this.form.value;
    this.tipoProductoService.createTipoProducto(formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');

        setTimeout(()=>{                  
          this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Producto Creado', life:5000});

     }, 0);
        this.router.navigateByUrl('tipoproductos');

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
