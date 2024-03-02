import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Alumno } from 'src/app/core/models/alumno.model';
import { AlumnosSelectors } from '../redux/alumnos.selectors';

@Component({
  selector: 'app-list-alumnos',
  templateUrl: './list-alumnos.component.html',
  styleUrls: ['./list-alumnos.component.scss']
})
export class ListAlumnosComponent {
  @Output() onSelect:EventEmitter<Alumno> = new EventEmitter();
  @Output() onDelete:EventEmitter<Alumno> = new EventEmitter();
  // REDUX
  public alumnosData:Alumno[] = [];
  //
  public columns: string[] = ['nombreCompleto', 'fechaNacimiento', 'email', "actions"];

  constructor(
    private store:Store
  ) {
    this.store.select(AlumnosSelectors.selectAlumnosData)
      .subscribe({
        next: alumnosData =>  {
          this.alumnosData = alumnosData;
        },
      })
  }

  handleSelect(alumno:Alumno):void {
    this.onSelect.emit(alumno);
  }
  handleDelete(alumno:Alumno):void {
    this.onDelete.emit(alumno);
  }
}
