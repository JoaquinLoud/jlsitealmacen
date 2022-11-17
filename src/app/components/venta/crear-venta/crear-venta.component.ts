import { Component, DebugElement, OnInit, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VentaService } from 'src/app/services/venta.service';
import { VentaI } from 'src/app/models/ventas';
import {Message,MessageService} from 'primeng/api';
import { ClienteI, VendedorI } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductoI, VentaProductoI } from 'src/app/models/productos';

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.css']
})
export class CrearVentaComponent implements OnInit {



  public form:FormGroup=this.formBuilder.group({
    // Venta Formulario
    descuento: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    cliente: ['', [Validators.required]],
    // total:  ['', [Validators.required]],
    // subtotal: ['', [Validators.required]],
    usuario: ['', [Validators.required]],
  });

  public dateValue: Date = new Date("2022-11-12");
  public Descuento: number = 0;
  public SubTotal: number  = 0;
  public Total: number = 0;
  public Cantidad: number | null = null;
  public Cliente: ClienteI[] = [];
  public Vendedor: VendedorI[] = [];
  public Producto: ProductoI[] = [];
  public ProductoPost: ProductoI[] = [];
  public VentaProductos: VentaProductoI[] = [];
  public count: number = 0;
  public AddProductos: number[] = [this.count]
  public seleccionarCliente: any ;
  public seleccionarVendedor: any ;
  public seleccionarProducto: any;
  public formulario: any;

  constructor(
    private formBuilder: FormBuilder,
    private ventaService: VentaService,
    private ClienteService: ClienteService,
    private ProductoService: ProductoService,
    private messageService: MessageService,
    private router: Router,
    ) { }

  ngOnInit(): void {

    this.ProductoService.getAllProducto().subscribe({
      next: data => {
        this.Producto = data;
        this.seleccionarProducto  = this.Producto[0].id;

      }
    })

    this.ClienteService.getAllCliente().subscribe({
      next: data => {
        this.Cliente = data;
      }
    })

    this.ClienteService.getAllVendedor().subscribe({
      next: data => {
        this.Vendedor = data;
      }
    })
  }


  agregar(): void {

    if((this.count+1)!==this.Producto.length) {
      this.count++;
      this.AddProductos.push(this.count)
    }

  
  }

  calcular(): void {
    this.SubTotal = 0;
    this.formulario = document.getElementById("formulario")
    this.AddProductos.forEach(e => {


      if(this.formulario[`selectAction${e}`] !== undefined){

        if(this.ProductoPost.filter(resp => {
          return resp.id == this.formulario[`selectAction${e}`].value
        }).length == 0) {
          this.ProductoPost.push(this.Producto.filter(resp => {
            return resp.id == this.formulario[`selectAction${e}`].value
          })[0])
  
          console.log("this.ProductoPost")
          console.log(this.ProductoPost)
          console.log("this.ProductoPost")
      
          // Agregar
          this.ProductoPost.forEach(resp => {
            if(resp.id == this.formulario[`selectAction${e}`].value) {
              resp.cantidadProducto = this.formulario[`cantidad${e}`].value
            }
          })
        }
        
      }

    })
    console.log("this.ProductoPost")
    console.log(this.ProductoPost)
    this.ProductoPost.forEach(e=>{
      this.SubTotal += Math.floor(e.cantidadProducto * e.precioProducto)
      this.SubTotal = this.SubTotal
    })
    console.log("this.ProductoPost")

    this.Total =Math.floor( this.SubTotal - this.form.value.descuento);

  }

  onSubmit(): void {

    this.form.value.fecha = this.formatDate(this.form.value.fecha)
    this.form.value.cliente = this.form.value.cliente.id
    this.form.value.usuario = this.form.value.usuario.id

    let auxVentaProductos:any = this.ProductoPost;
    
    const formValue: VentaI = this.form.value;
    console.log("formValue")
    console.log(formValue)
    console.log("formValue")
    formValue['total'] = this.Total;
    formValue['subtotal'] = this.Total;
    this.ventaService.createVenta(formValue) .subscribe(
      (resp) => {
        // console.log('Se ha creado correctamente');
        console.log("resp")
        console.log(resp)
        console.log("resp")

        auxVentaProductos.forEach((element:any) => {
          element['cantidad'] = element['cantidadProducto']
          delete element['cantidadProducto']
          element['precio'] = element['precioProducto']
          delete element['precioProducto']
          element['fechaVenta'] = this.form.value.fecha
          delete element['nombreProducto']
          delete element['marcaProducto']
          delete element['stockminProducto']
          delete element['tipoProducto']
          element['venta'] = resp.id
          element['producto'] = element["id"]
          delete element["id"]
          element['total'] = (element['precio'] * element['cantidad']) - this.form.value.descuento
        });
        this.VentaProductos = auxVentaProductos;

        console.log("this.VentaProductos")
        console.log(this.VentaProductos)
        console.log("this.VentaProductos")
        this.ventaService.createVentaProducto(this.VentaProductos).subscribe(
          ()=>{
            setTimeout(()=>{                  
              this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Venta Creada', life:5000});
    
          }, 0);
          }
        )
        
      
  


      

      },
      err => {

        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }


  formatDate(d:Date) {
    let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  cancel() {
    this.router.navigateByUrl('/addventas');
  }

  eliminar(id:number) {
    console.log("id")
    console.log(id)
    console.log("id")
    this.AddProductos = this.AddProductos.filter(e => e != id)
    // this.router.navigateByUrl('/addventas');
  }


  get descuento() { return this.form.get('descuento'); }
  get fecha() { return this.form.get('fecha'); }
  get cliente() { return this.form.get('cliente'); }
  get usuario() { return this.form.get('usuario'); }
  // get total() { return this.form.get('total'); }
  // get subtotal() { return this.form.get('subtotal'); }
  // get producto() { return this.form.get('producto'); }
  get cantidad() { return this.form.get('cantidad'); }

  
  // "fecha": "2022-11-13",
  // "descuento": "3.00",
  // "total": "3.30",
  // "subtotal": "3.00",
  // "usuario": 1,
  // "cliente": 2
}
