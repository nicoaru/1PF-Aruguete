import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAlumnosComponent } from './list-alumnos/list-alumnos.component';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { AlumnosComponent } from './alumnos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListCursosInscriptoComponent } from './list-cursos-inscripto/list-cursos-inscripto.component';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { AlumnosEffects } from './redux/alumnos.effects';
import { StoreModule } from '@ngrx/store';
import { alumnosFeature } from './redux/alumnos.reducer';

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
    SharedModule,
    AlumnosRoutingModule,
    StoreModule.forFeature(alumnosFeature),
    EffectsModule.forFeature([AlumnosEffects])
  ],
  exports: [
    AlumnosComponent
  ]
})
export class AlumnosModule { }
