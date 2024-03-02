import { Injectable } from '@angular/core';
import { Inscripcion } from '../models/inscripcion.model';
import { UtilsService } from './utils.service';
import { Observable, firstValueFrom, of } from 'rxjs';
import { InscripcionDto } from '../models/inscripcion.dto';
import { CursosService } from './cursos.service';
import { AlumnosService } from './alumnos.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private environment = environment;


  constructor(
    private httpClient:HttpClient
  ) { }


  getAll():Observable<InscripcionDto[]> {
    return this.httpClient.get<InscripcionDto[]>(this.environment.apiURL+'/enrollments?_expand=student&_expand=course');
  }

  getById(id:number):Observable<InscripcionDto|null> {
    return this.httpClient.get<InscripcionDto|null>(this.environment.apiURL+'/enrollments/'+id+'?_expand=student&_expand=course');
  }

  getByAlumnoId(idAlumno:number):Observable<InscripcionDto[]> {
    return this.httpClient.get<InscripcionDto[]>(`${this.environment.apiURL}/enrollments?studentId=${idAlumno}&_expand=course&_expand=student`);
  }

  getByCursoId(idCurso:number):Observable<InscripcionDto[]> {
    return this.httpClient.get<InscripcionDto[]>(`${this.environment.apiURL}/enrollments?courseId=${idCurso}&_expand=course&_expand=student`);
  }

  create(inscripcion:InscripcionDto):Observable<InscripcionDto|null> {
    const entity = InscripcionDto.toEntity(inscripcion);
    return this.httpClient.post<InscripcionDto|null>(this.environment.apiURL+'/enrollments', entity);
  }

  async deleteById(id:number):Promise<Observable<InscripcionDto|null>> {
    return this.httpClient.delete<InscripcionDto|null>(this.environment.apiURL+'/enrollments/'+id);
  }

  async updateById(id:number, inscripcionUpdated:InscripcionDto):Promise<Observable<InscripcionDto|null>> {
    return this.httpClient.put<InscripcionDto|null>(this.environment.apiURL+'/students/'+id, inscripcionUpdated);
  }
}