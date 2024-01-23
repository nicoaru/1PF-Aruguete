import { Component } from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';

let alumnosData:Alumno[] = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    email: "juanpe@gmail.com",
    telefono: "4879-9856",
    fechaNacimiento: new Date("1987, 02, 06")
  },
  {
    id: 2,
    nombre: "Juana",
    apellido: "Belardez",
    email: "juanabe@gmail.com",
    telefono: "4456-4854",
    fechaNacimiento: new Date("1952, 12, 26")
  },
  {
    id: 3,
    nombre: "Alberto",
    apellido: "Brener",
    email: "albertobre@gmail.com",
    telefono: "4168-4876",
    fechaNacimiento: new Date("1978, 04, 02")
  },
  {
    id: 4,
    nombre: "Cacho",
    apellido: "Taberla",
    email: "cachotal@gmail.com",
    telefono: "4785-5846",
    fechaNacimiento: new Date("1997, 08, 09")
  },
  {
    id: 5,
    nombre: "Maria",
    apellido: "Pérez",
    email: "mariape@gmail.com",
    telefono: "4785-5486",
    fechaNacimiento: new Date("1988, 07, 18")
  }
]

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent {
  public alumnos = alumnosData;
  public alumno?:Alumno;

  constructor() { }

  handleOnSave(alumno:Alumno):void {
    console.log("onSaveAlumno - alumno: ", alumno);
    if(alumno?.id) {
      let ix = this.alumnos.findIndex((elem:Alumno) => elem.id === alumno.id);
      this.alumnos.splice(ix, 1, alumno);
      this.alumnos = [...this.alumnos];
      this.alumno = alumno;      
    }
    else {
      let newId = [...this.alumnos].sort((a:Alumno, b:Alumno) => a.id!-b.id!)[this.alumnos.length-1].id!+1;
      let newAlumno = {...alumno, id: newId}
      this.alumnos = [...this.alumnos, newAlumno]
      this.alumno = newAlumno;
    }
  }

  handleOnDelete(alumno:Alumno):void {
    this.alumnos = this.alumnos.filter((elem:Alumno) => elem.id !== alumno.id);
    this.alumno = undefined;
  }

  handleOnSelect(alumno:Alumno):void {
    console.log("handleOnSelect - alumno: ", alumno);
    this.alumno = alumno;
  }

  handleCargarNuevo() {
    this.alumno = undefined;
  }

}
