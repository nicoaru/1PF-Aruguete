
export class Alumno {
    id: number | null;
    nombre: string | null;
    apellido: string | null;
    fechaNacimiento: Date | null;
    telefono: string | null;
    email: string | null;

    constructor(
        id?: number,
        nombre?: string,
        apellido?: string,
        fechaNacimiento?: Date,
        telefono?: string,
        email?: string
    ) {
        this.id = id || null
        this.nombre = nombre || null
        this.apellido = apellido || null
        this.fechaNacimiento = fechaNacimiento || null
        this.telefono = telefono || null
        this.email = email || null
    }
    
}