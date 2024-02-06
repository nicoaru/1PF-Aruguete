import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAlumnosComponent } from './list-alumnos/list-alumnos.component';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { AlumnosComponent } from './alumnos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListCursosInscriptoComponent } from './list-cursos-inscripto/list-cursos-inscripto.component';

@NgModule({
  declarations: [
    ListAlumnosComponent,
    AbmAlumnosComponent,
    AlumnosComponent,
    ListCursosInscriptoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    AlumnosComponent
  ]
})
export class AlumnosModule { }
