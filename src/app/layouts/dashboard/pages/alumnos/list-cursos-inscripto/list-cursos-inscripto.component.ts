import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscripcionDto } from 'src/app/core/models/inscripcion.dto';
import { AlumnosSelectors } from '../redux/alumnos.selectors';

@Component({
  selector: 'app-list-cursos-inscripto',
  templateUrl: './list-cursos-inscripto.component.html',
  styleUrls: ['./list-cursos-inscripto.component.scss']
})
export class ListCursosInscriptoComponent {
  @Output() onDelete:EventEmitter<InscripcionDto> = new EventEmitter();
  // REDUX
    inscripcionesData:InscripcionDto[] = [];
  //
  public columns: string[] = ['nombre', 'fechaInicio', 'fechaFin', "actions"];


  constructor(
    private store:Store
  ) {
    // REDUX
    this.store.select(AlumnosSelectors.selectInscripcionesData)
      .subscribe({
        next: inscripcionesData => this.inscripcionesData = inscripcionesData
      })
  }

  handleDelete(inscripcion:InscripcionDto):void {
    this.onDelete.emit(inscripcion);
  }
}
