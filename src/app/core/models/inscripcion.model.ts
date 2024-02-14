export class Inscripcion {
    id: number | null;
    studentId: number | null;
    courseId: number | null;
    fechaInscripcion: Date | null;

    constructor(
        id?: number|null,
        studentId?: number|null,
        courseId?: number|null,
        fechaInscripcion?: Date|null
    ) {
        this.id = id || null;
        this.studentId = studentId || null;
        this.courseId = courseId || null;
        this.fechaInscripcion = fechaInscripcion || null;
    }
    
}