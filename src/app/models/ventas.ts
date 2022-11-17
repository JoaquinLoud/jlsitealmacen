export interface VentaI {
    id?: number,
    fecha: Date,
    descuento: number,
    total: number,
    subtotal: number,
    created: Date,
    updated: Date,
    usuario: number | string,
    cliente: number | string
}

