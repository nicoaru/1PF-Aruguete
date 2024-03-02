import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from 'src/app/core/models/alumno.model';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { firstValueFrom, timeout } from 'rxjs';
import { Store } from '@ngrx/store';
import { AlumnosSelectors } from './redux/alumnos.selectors';
import { AlumnosActions } from './redux/alumnos.actions';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {
  // REDUX
  public alumnosData:Alumno[] = [];
  public alumno?:Alumno;
  //
  
  constructor(
    private dialogService:MatDialog,
    private alumnosService:AlumnosService,
    private store:Store
  ) {
    this.store.select(AlumnosSelectors.selectState)
      .subscribe({
        next: state => {
          this.alumnosData = state.alumnosData;
          this.alumno = state.selectedAlumno;
        }
      })
  }

  ngOnInit(): void {
    this.getData();
  }

  async getData():Promise<void> {
    const data = await firstValueFrom(this.alumnosService.getAll());
    this.store.dispatch(AlumnosActions.setAlumnosData({ alumnosData: data }))
    console.log("Alumnos data: ", this.alumnosData);
  }

  async handleOnDelete(alumno:Alumno):Promise<void> {
    try {
      const deleted = await firstValueFrom(this.alumnosService.deleteById(alumno.id!));
      this.getData()
    }
    catch(err:any) {
      console.log("Error eliminando alumno: ", err.message);
    }
  }

  async handleOnSelect(alumno:Alumno):Promise<void> {
    console.log("handleOnSelect - alumno: ", alumno);
    this.store.dispatch(AlumnosActions.setSelectedAlumno({ selectedAlumno: alumno }))
    let dialogRef = this.dialogService.open(AbmAlumnosComponent, {
      disableClose: true
    })
  
    dialogRef.afterClosed()
      .subscribe({
        next: value => this.getData()
      })
  }

  async handleCargarNuevo():Promise<void> {
    let dialogRef = this.dialogService.open(AbmAlumnosComponent, {
      data:{
        alumno: null
      },
      disableClose: true
    });

    dialogRef.afterClosed()
    .subscribe({
      next: value => this.getData()
    })
  }
}