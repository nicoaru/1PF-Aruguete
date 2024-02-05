export class Curso {
    id: number | null;
    nombre: string | null;
    descripcion: string | null;
    fechaInicio: Date | null;
    fechaFin: Date | null;

    constructor(
        id?: number,
        nombre?: string,
        descripcion?: string,
        fechaInicio?: Date,
        fechaFin?: Date
    ) {
        this.id = id || null;
        this.nombre = nombre || null;
        this.descripcion = descripcion || null;
        this.fechaInicio = fechaInicio || null;
        this.fechaFin = fechaFin || null;
    }
    
}