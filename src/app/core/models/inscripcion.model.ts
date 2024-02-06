import { Alumno } from "./alumno.model";
import { Curso } from "./curso.model";

export class Inscripcion {
    id: number | null;
    idAlumno: number | null;
    idCurso: number | null;
    fechaInscripcion: Date | null;

    constructor(
        id?: number|null,
        idAlumno?: number|null,
        idCurso?: number|null,
        fechaInscripcion?: Date|null
    ) {
        this.id = id || null;
        this.idAlumno = idAlumno || null;
        this.idCurso = idCurso || null;
        this.fechaInscripcion = fechaInscripcion || null;
    }
    
}