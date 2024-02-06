import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alumno } from 'src/app/core/models/alumno.model';
import { InscripcionDto } from 'src/app/core/models/inscripcion.dto';
import { Inscripcion } from 'src/app/core/models/inscripcion.model';

@Component({
  selector: 'app-list-inscriptos',
  templateUrl: './list-inscriptos.component.html',
  styleUrls: ['./list-inscriptos.component.scss']
})
export class ListInscriptosComponent {
  @Input() data:InscripcionDto[] =  [];
  @Output() onSelect:EventEmitter<InscripcionDto> = new EventEmitter();
  @Output() onDelete:EventEmitter<InscripcionDto> = new EventEmitter();
  public columns: string[] = ['nombreCompleto', 'fechaNacimiento', 'email', "actions"];

  handleSelect(inscripcion:InscripcionDto):void {
    this.onSelect.emit(inscripcion);
  }
  handleDelete(inscripcion:InscripcionDto):void {
    this.onDelete.emit(inscripcion);
  }
}
