export interface ProductoI {
    id?: number;
    nombreProducto: string
    marcaProducto: string
    precioProducto: number
    stockminProducto: string
    cantidadProducto: number
    tipoProducto: number | string
}

export interface VentaProductoI {
    id?:number
    fechaVenta: Date,
    precio: number,
    cantidad: number,
    total: number,
    producto: number,
    venta: number
}
