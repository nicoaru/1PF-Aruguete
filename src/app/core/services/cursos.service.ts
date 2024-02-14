import { Injectable } from '@angular/core';
import { Curso } from '../models/curso.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private environment = environment;

  constructor(
    private httpClient:HttpClient
  ) { }

  getAll():Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(this.environment.apiURL+'/courses');
  }

  getById(id:number):Observable<Curso|null> {
    return this.httpClient.get<Curso|null>(this.environment.apiURL+'/courses/'+id);
  }

  create(curso:Curso):Observable<Curso|null> {
    return this.httpClient.post<Curso|null>(this.environment.apiURL+'/courses', curso);
  }

  deleteById(id:number):Observable<Curso|null> {
    return this.httpClient.delete<Curso|null>(this.environment.apiURL+'/courses/'+id);
  }

  updateById(id:number, cursoUpdated:Curso):Observable<Curso|null> {
    return this.httpClient.put<Curso|null>(this.environment.apiURL+'/courses/'+id, cursoUpdated);
  }
  
}