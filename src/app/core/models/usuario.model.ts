import { ROLE } from "./role.enum";

export class Usuario {
    id:number|null;
    username:string|null;
    password:string|null;
    email:string|null;
    nombre:string|null;
    apellido:string|null;
    role:ROLE|null;
    token:string|null;

    constructor(
        id?: number,
        username?: string,
        password?: string,
        email?: string,
        nombre?: string,
        apellido?: string,
        role?: ROLE,
        token?: string
    ) {
        this.id = id || null
        this.username = username || null
        this.password = password || null
        this.email = email || null
        this.nombre = nombre || null
        this.apellido = apellido || null
        this.role = role || null
        this.token = token || null
    }
}