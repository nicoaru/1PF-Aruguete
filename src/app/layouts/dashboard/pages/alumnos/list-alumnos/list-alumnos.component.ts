import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Alumno } from 'src/app/models/alumno.model';

@Component({
  selector: 'app-list-alumnos',
  templateUrl: './list-alumnos.component.html',
  styleUrls: ['./list-alumnos.component.scss']
})
export class ListAlumnosComponent {
  @Input() data:Alumno[] =  [];
  @Output() onSelect:EventEmitter<Alumno> = new EventEmitter()
  public columns: string[] = ['nombreCompleto', 'fechaNacimiento', 'email', "ver"];

  handleSelect(alumno:Alumno):void {
    this.onSelect.emit(alumno);
  }
}
