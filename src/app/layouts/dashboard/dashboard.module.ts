import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CursosModule } from './pages/cursos/cursos.module';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { HomeModule } from './pages/home/home.module';
import { DashboardRoutingModule } from './dashboard-routing.module';





@NgModule({
  declarations: [
    DashboardComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    HomeModule,
    AlumnosModule,
    CursosModule,
    NotFoundModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
