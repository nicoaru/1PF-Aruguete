import { createFeature, createReducer, on } from '@ngrx/store';
import { AlumnosActions } from './alumnos.actions';
import { Alumno } from 'src/app/core/models/alumno.model';
import { InscripcionDto } from 'src/app/core/models/inscripcion.dto';
import { Curso } from 'src/app/core/models/curso.model';
import { Inscripcion } from 'src/app/core/models/inscripcion.model';

export const alumnosFeatureKey = 'alumnos';

export interface State {
  alumnosData:Alumno[],
  selectedAlumno:Alumno|undefined,
  inscripcionesData:InscripcionDto[],
  cursosData:Curso[],
}

export const initialState: State = {
  alumnosData: [],
  selectedAlumno: undefined,
  inscripcionesData:[],
  cursosData:[],
};

export const reducer = createReducer(
  initialState,
  on(AlumnosActions.setAlumnosData, (state, {alumnosData}) => ({...state, alumnosData: alumnosData || []})),
  on(AlumnosActions.setSelectedAlumno, (state, { selectedAlumno }) => ({...state, selectedAlumno: selectedAlumno || undefined})),
  on(AlumnosActions.setInscripcionesData, (state, { inscripcionesData }) => ({...state, inscripcionesData: inscripcionesData || []})),
  on(AlumnosActions.setCursosData, (state, { cursosData }) => ({...state, cursosData: cursosData || []})),
);

export const alumnosFeature = createFeature({
  name: alumnosFeatureKey,
  reducer,
});

