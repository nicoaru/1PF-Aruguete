import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAlumnosComponent } from './list-alumnos/list-alumnos.component';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { AlumnosComponent } from './alumnos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListAlumnosComponent,
    AbmAlumnosComponent,
    AlumnosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    AlumnosComponent
  ]
})
export class AlumnosModule { }
