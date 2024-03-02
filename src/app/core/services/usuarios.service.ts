import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private environment = environment;

  constructor(
    private httpClient:HttpClient
  ) { }

  getAll():Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.environment.apiURL+'/users');
  }

  getById(id:number):Observable<Usuario|null> {
    return this.httpClient.get<Usuario|null>(this.environment.apiURL+'/users/'+id);
  }

  create(usuario:Usuario):Observable<Usuario|null> {
    return this.httpClient.post<Usuario|null>(this.environment.apiURL+'/users', usuario);
  }

  deleteById(id:number):Observable<Usuario|null> {
    return this.httpClient.delete<Usuario|null>(this.environment.apiURL+'/users/'+id);
  }

  updateById(id:number, usuarioUpdated:Usuario):Observable<Usuario|null> {
    return this.httpClient.put<Usuario|null>(this.environment.apiURL+'/users/'+id, usuarioUpdated);
  }
  
}