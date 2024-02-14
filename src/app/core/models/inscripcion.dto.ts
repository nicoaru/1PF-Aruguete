import { Alumno } from "./alumno.model";
import { Curso } from "./curso.model";
import { Inscripcion } from "./inscripcion.model";

export class InscripcionDto {
    id: number | null;
    student: Alumno | null;
    course: Curso | null;
    fechaInscripcion: Date | null;

    constructor(
        id?: number | null,
        student?: Alumno | null,
        course?: Curso | null,
        fechaInscripcion?: Date | null
    ) {
        this.id = id || null;
        this.student = student || null;
        this.course = course || null;
        this.fechaInscripcion = fechaInscripcion || null;
    }
    
    static toEntity(dto:InscripcionDto):Inscripcion {
        const entity = new Inscripcion(dto.id, dto.student?.id, dto.course?.id, dto.fechaInscripcion);
        return entity;
    }
}