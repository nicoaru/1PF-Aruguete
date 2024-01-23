import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AlumnosModule } from './pages/alumnos/alumnos.module';





@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AlumnosModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
