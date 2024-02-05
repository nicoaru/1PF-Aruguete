import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Alumno } from 'src/app/core/models/alumno.model';

@Component({
  selector: 'app-list-alumnos',
  templateUrl: './list-alumnos.component.html',
  styleUrls: ['./list-alumnos.component.scss']
})
export class ListAlumnosComponent {
  @Input() data:Alumno[] =  [];
  @Output() onSelect:EventEmitter<Alumno> = new EventEmitter();
  @Output() onDelete:EventEmitter<Alumno> = new EventEmitter();
  public columns: string[] = ['nombreCompleto', 'fechaNacimiento', 'email', "actions"];

  handleSelect(alumno:Alumno):void {
    this.onSelect.emit(alumno);
  }
  handleDelete(alumno:Alumno):void {
    this.onDelete.emit(alumno);
  }
}
