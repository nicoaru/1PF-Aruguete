import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbmCursosComponent } from './abm-cursos/abm-cursos.component';
import { ListCursosComponent } from './list-cursos/list-cursos.component';
import { CursosComponent } from './cursos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListInscriptosComponent } from './list-inscriptos/list-inscriptos.component';



@NgModule({
  declarations: [
    AbmCursosComponent,
    ListCursosComponent,
    CursosComponent,
    ListInscriptosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CursosModule { }
