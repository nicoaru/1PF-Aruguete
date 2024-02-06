import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Alumno } from 'src/app/core/models/alumno.model';

let data:Alumno[] = [
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

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private alumnosData:Alumno[] = data;
  private lastId:number;

  constructor() {
    this.alumnosData = data;
    this.lastId = this.alumnosData.sort((a:Alumno, b:Alumno) => a.id! - b.id!)[this.alumnosData.length-1].id!;
  }

  getAll():Observable<Alumno[]> {
    return of(this.alumnosData);
  }

  getById(id:number):Observable<Alumno|null> {
    const alumno:Alumno|null = this.alumnosData.find(elem => elem.id === id) || null;
    return of(alumno);
  }

  create(alumno:Alumno):Observable<Alumno|null> {
    alumno.id = this.lastId+1;
    this.lastId++;
    this.alumnosData.push(alumno) ;
    return of(alumno);
  }

  deleteById(id:number):Observable<Alumno|null> {
    const ix:number = this.alumnosData.findIndex(elem => elem.id === id);
    const alumnoDeleted:Alumno|null = this.alumnosData.splice(ix, 1)[0];
    return of(alumnoDeleted);
  }

  updateById(id:number, alumnoUpdated:Alumno):Observable<Alumno|null> {
    const ix:number = this.alumnosData.findIndex(elem => elem.id! === id);

    if(ix >= 0) {
      alumnoUpdated.id = id;
      this.alumnosData.splice(ix, 1, alumnoUpdated)
      return of(alumnoUpdated);
    }
    else {
      return of(null);
    }
  }


}
