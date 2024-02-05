import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Curso } from 'src/app/core/models/curso.model';

@Component({
  selector: 'app-list-cursos',
  templateUrl: './list-cursos.component.html',
  styleUrls: ['./list-cursos.component.scss']
})
export class ListCursosComponent {
  @Input() data:Curso[] =  [];
  @Output() onSelect:EventEmitter<Curso> = new EventEmitter();
  @Output() onDelete:EventEmitter<Curso> = new EventEmitter()
  public columns: string[] = ['nombre', 'fechaInicio', 'fechaFin', "actions"];

  handleSelect(curso:Curso):void {
    this.onSelect.emit(curso);
  }

  handleDelete(curso:Curso):void {
    this.onDelete.emit(curso);
  }
}
