import { Injectable } from '@angular/core';
import { Curso } from '../models/curso.model';
import { Observable, of } from 'rxjs';

let data:Curso[] = [
  {
    id: 1,
    nombre: "React Js",
    descripcion: "Descubre el fascinante mundo de ReactJS, la biblioteca de JavaScript que ha revolucionado el desarrollo de interfaces de usuario en la web. Este curso te sumergirá en los fundamentos y las mejores prácticas de React, proporcionándote las habilidades necesarias para crear aplicaciones web interactivas y eficientes.",
    fechaInicio: new Date('2024-03-21'),
    fechaFin: new Date('2024-05-21')
  },
  {
    id: 2,
    nombre: "Angular",
    descripcion: "¡Sumérgete en el emocionante mundo de Angular y domina una de las plataformas de desarrollo web más poderosas y populares disponibles en la actualidad! Este curso te llevará desde los conceptos básicos hasta las técnicas avanzadas de Angular, permitiéndote construir aplicaciones web modernas, robustas y escalables.",
    fechaInicio: new Date('2024-03-08'),
    fechaFin: new Date('2024-05-08')
  },  
  {
    id: 3,
    nombre: "NestJs",
    descripcion: "¡Explora la elegancia de NestJS, un framework de desarrollo en Node.js que combina lo mejor de Angular con las capacidades de Node para crear aplicaciones backend robustas y escalables! Este curso te sumergirá en el mundo de NestJS, desde los conceptos fundamentales hasta las técnicas avanzadas, permitiéndote construir servidores eficientes y modularizados.",
    fechaInicio: new Date('2024-04-15'),
    fechaFin: new Date('2024-06-21')
  },  
  {
    id: 4,
    nombre: "SQL",
    descripcion: "Adéntrate en el mundo de las bases de datos relacionales con nuestro curso de SQL, diseñado para proporcionarte los conocimientos esenciales y las habilidades prácticas necesarias para gestionar eficientemente datos en sistemas de gestión de bases de datos (DBMS). Desde la creación de tablas hasta consultas avanzadas, este curso te equipará con las herramientas necesarias para trabajar con datos de manera efectiva.",
    fechaInicio: new Date('2024-05-21'),
    fechaFin: new Date('2024-07-12')
  },
]

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private cursosData:Curso[] = data;
  private lastId:number;

  constructor() {
    this.cursosData = data;
    this.lastId = this.cursosData.sort((a:Curso, b:Curso) => a.id! - b.id!)[this.cursosData.length-1].id!;
  }

  getAll():Observable<Curso[]> {
    return of(this.cursosData);
  }

  getById(id:number):Observable<Curso|null> {
    const curso:Curso|null = this.cursosData.find(elem => elem.id === id) || null;
    return of(curso);
  }

  create(curso:Curso):Observable<Curso|null> {
    curso.id = this.lastId+1;
    this.cursosData.push(curso) ;
    return of(curso);
  }

  deleteById(id:number):Observable<Curso|null> {
    const ix:number = this.cursosData.findIndex(elem => elem.id = id);
    const cursoDeleted:Curso|null = this.cursosData.splice(ix, 1)[0];
    return of(cursoDeleted);
  }

  updateById(id:number, cursoUpdated:Curso):Observable<Curso|null> {
    const ix:number = this.cursosData.findIndex(elem => elem.id! === id);

    if(ix >= 0) {
      cursoUpdated.id = id;
      this.cursosData.splice(ix, 1, cursoUpdated)
      return of(cursoUpdated);
    }
    else {
      return of(null);
    }
  }


}
