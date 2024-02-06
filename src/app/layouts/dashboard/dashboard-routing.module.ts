import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { AbmCursosComponent } from './pages/cursos/abm-cursos/abm-cursos.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { DashboardComponent } from './dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "alumnos",
    component: AlumnosComponent
  },
  {
    path: "cursos",
    component: CursosComponent
  },
  {
    path:"home",
    component: HomeComponent
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
