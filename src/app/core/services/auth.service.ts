import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export interface ILoginData {
  username:string,
  password:string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private environment = environment;
  public authUser:Usuario|null = null;

  constructor(
    private httpClient:HttpClient,
    private router:Router
  ) { }

  async login(loginData:ILoginData):Promise<void> {
    const user:Usuario[] = await firstValueFrom(this.httpClient.get<Usuario[]>(`${this.environment.apiURL}/users?username=${loginData.username}&password=${loginData.password}`));

    if(user[0]) {
      this.setAuthUser(user[0]);
      this.router.navigate(['dashboard'])
    }
    else {
      Swal.fire({
        title: 'Error!',
        text: 'Usuario o contraseña inválidos',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

  logout():void {
    this.authUser = null;
    localStorage.removeItem('token');
    this.router.navigate(['auth']);
  }

  setAuthUser(user:Usuario):void {
    this.authUser = user;
    localStorage.setItem('token', user.token!)
  }

  async verifyToken():Promise<boolean> {
    const user:Usuario[] = await firstValueFrom(this.httpClient.get<Usuario[]>(`${this.environment.apiURL}/users?token=${localStorage.getItem('token')}`));

    if(user[0]) {
      this.setAuthUser(user[0]);
      return true;
    }
    else {
      return false;
    }
  }
}
