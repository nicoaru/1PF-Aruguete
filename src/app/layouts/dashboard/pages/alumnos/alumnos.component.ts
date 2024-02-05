import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from 'src/app/core/models/alumno.model';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { firstValueFrom, timeout } from 'rxjs';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {
  public alumnosData:Alumno[] = [];
  public alumno?:Alumno;

  constructor(
    private dialogService:MatDialog,
    private alumnosService:AlumnosService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData():Promise<void> {
    const data = await firstValueFrom(this.alumnosService.getAll());
    this.alumnosData = [...data]
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
    let dialogRef = this.dialogService.open(AbmAlumnosComponent, {
      data:{
        alumno: alumno
      },
      disableClose: true
    })

    try {
      const persistio:boolean = await firstValueFrom(dialogRef.afterClosed());
      if(persistio) {
        this.getData();
      }
    }
    catch(err:any) {
      console.log("Error al hacer update: ", err.message);
    }
  }

  async handleCargarNuevo():Promise<void> {
    let dialogRef = this.dialogService.open(AbmAlumnosComponent, {
      data:{
        alumno: null
      },
      disableClose: true
    });

    try {
      const persistio:boolean = await firstValueFrom(dialogRef.afterClosed());
      if(persistio) {
        this.getData();
        console.log("Alumnos data: ", this.alumnosData);
        
      }
    }
    catch(err:any) {
      console.log("Error al cargar nuevo: ", err.message);
    }
  }

}
