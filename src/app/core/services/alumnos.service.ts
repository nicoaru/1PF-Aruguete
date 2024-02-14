import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Alumno } from 'src/app/core/models/alumno.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private environment = environment;

  constructor(
    private httpClient:HttpClient
  ) { }

  getAll():Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(this.environment.apiURL+'/students');
  }

  getById(id:number):Observable<Alumno|null> {
    return this.httpClient.get<Alumno|null>(this.environment.apiURL+'/students/'+id);
  }

  create(alumno:Alumno):Observable<Alumno|null> {
    return this.httpClient.post<Alumno|null>(this.environment.apiURL+'/students', alumno);
  }

  deleteById(id:number):Observable<Alumno|null> {
    return this.httpClient.delete<Alumno|null>(this.environment.apiURL+'/students/'+id);
  }

  updateById(id:number, alumnoUpdated:Alumno):Observable<Alumno|null> {
    return this.httpClient.put<Alumno|null>(this.environment.apiURL+'/students/'+id, alumnoUpdated);
  }
  
}