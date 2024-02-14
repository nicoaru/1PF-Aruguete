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
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path:"home",
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: "alumnos",
    loadChildren: () => import('./pages/alumnos/alumnos.module').then((m) => m.AlumnosModule)
  },
  {
    path: "cursos",
    loadChildren: () => import('./pages/cursos/cursos.module').then((m) => m.CursosModule)
  },
  {
    path: "usuarios",
    loadChildren: () => import('./pages/usuarios/usuarios.module').then((m) => m.UsuariosModule)
  },
  {
    path: "**",
    loadChildren: () => import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
