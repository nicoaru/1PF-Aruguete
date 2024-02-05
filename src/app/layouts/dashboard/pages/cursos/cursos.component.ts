import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Curso } from 'src/app/core/models/curso.model';
import { CursosService } from 'src/app/core/services/cursos.service';
import { AbmCursosComponent } from './abm-cursos/abm-cursos.component';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent {
  public cursosData:Curso[] = [];
  public curso?:Curso;

  constructor(
    private dialogService:MatDialog,
    private cursosService:CursosService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData():Promise<void> {
    const data = await firstValueFrom(this.cursosService.getAll());
    this.cursosData = [...data]
    console.log("Cursos data: ", this.cursosData);
  }

  async handleOnDelete(curso:Curso):Promise<void> {
    try {
      const deleted = await firstValueFrom(this.cursosService.deleteById(curso.id!));
      this.getData()
    }
    catch(err:any) {
      console.log("Error eliminando curso: ", err.message);
      
    }
  }

  async handleOnSelect(curso:Curso):Promise<void> {
    console.log("handleOnSelect - curso: ", curso);
    let dialogRef = this.dialogService.open(AbmCursosComponent, {
      data:{
        curso: curso
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
    let dialogRef = this.dialogService.open(AbmCursosComponent, {
      data:{
        curso: null
      },
      disableClose: true
    });

    try {
      const persistio:boolean = await firstValueFrom(dialogRef.afterClosed());
      if(persistio) {
        this.getData();
        console.log("Cursos data: ", this.cursosData);
        
      }
    }
    catch(err:any) {
      console.log("Error al cargar nuevo: ", err.message);
    }
  }
}
