import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlumnos from './alumnos.reducer';

export const selectAlumnosState = createFeatureSelector<fromAlumnos.State>(
  fromAlumnos.alumnosFeatureKey
);

const selectState = createSelector(
  selectAlumnosState,
  (state) => state
)

const selectAlumnosData = createSelector(
  selectAlumnosState,
  ({alumnosData}) => alumnosData
);

const selectInscripcionesData = createSelector(
  selectAlumnosState,
  ({inscripcionesData}) => inscripcionesData
);

const selectCursosData = createSelector(
  selectAlumnosState,
  ({cursosData}) => cursosData
);

const selectSelectedAlumno = createSelector(
  selectAlumnosState,
  ({selectedAlumno}) => selectedAlumno
);

export const AlumnosSelectors = {
  selectState,
  selectAlumnosData,
  selectSelectedAlumno,
  selectCursosData,
  selectInscripcionesData
}