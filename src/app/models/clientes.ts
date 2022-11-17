export interface ClienteI {
    id?: number;
    nombreCliente: string
    direccionCliente: string
    telefonoCliente: string
    correoCliente: string
    passwordCliente: string
}

export interface VendedorI {
    id?: number,
    password: string,
    last_login: string | Date,
    is_superuser: boolean,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    is_staff: boolean,
    is_active: boolean,
    date_joined: string | Date,
    groups: any,
    user_permissions: any
}