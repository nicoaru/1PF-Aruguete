import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Alumno } from 'src/app/core/models/alumno.model';
import { Curso } from 'src/app/core/models/curso.model';
import { InscripcionDto } from 'src/app/core/models/inscripcion.dto';

export const AlumnosActions = createActionGroup({
  source: 'Alumnos',
  events: {
    setAlumnosData: props<{alumnosData?:Alumno[]|null}>(),
    setSelectedAlumno: props<{selectedAlumno?:Alumno|null}>(),
    setInscripcionesData: props<{inscripcionesData?:InscripcionDto[]|null}>(),
    setCursosData: props<{cursosData?:Curso[]|null}>(),
  }
});
