import { Alumno } from "./alumno.model";
import { Curso } from "./curso.model";
import { Inscripcion } from "./inscripcion.model";

export class InscripcionDto {
    id: number | null;
    alumno: Alumno | null;
    curso: Curso | null;
    fechaInscripcion: Date | null;

    constructor(
        id?: number | null,
        alumno?: Alumno | null,
        curso?: Curso | null,
        fechaInscripcion?: Date | null
    ) {
        this.id = id || null;
        this.alumno = alumno || null;
        this.curso = curso || null;
        this.fechaInscripcion = fechaInscripcion || null;
    }
    
    static toEntity(dto:InscripcionDto):Inscripcion {
        const entity = new Inscripcion(dto.id, dto.alumno?.id, dto.curso?.id, dto.fechaInscripcion);
        return entity;
    }
}