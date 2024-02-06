import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InscripcionDto } from 'src/app/core/models/inscripcion.dto';

@Component({
  selector: 'app-list-cursos-inscripto',
  templateUrl: './list-cursos-inscripto.component.html',
  styleUrls: ['./list-cursos-inscripto.component.scss']
})
export class ListCursosInscriptoComponent {
  @Input() data:InscripcionDto[] =  [];
  @Output() onSelect:EventEmitter<InscripcionDto> = new EventEmitter();
  @Output() onDelete:EventEmitter<InscripcionDto> = new EventEmitter();
  public columns: string[] = ['nombre', 'fechaInicio', 'fechaFin', "actions"];

  handleSelect(inscripcion:InscripcionDto):void {
    this.onSelect.emit(inscripcion);
  }
  handleDelete(inscripcion:InscripcionDto):void {
    this.onDelete.emit(inscripcion);
  }
}
