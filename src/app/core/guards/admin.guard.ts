import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ROLE } from '../models/role.enum';
import Swal from 'sweetalert2';

export const adminGuard: CanActivateFn = async (route, state):Promise<boolean|UrlTree> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isAuth:boolean = await authService.verifyToken();
  if(isAuth) {
    const role:ROLE|null = authService.authUser!.role;
    
    if(role === ROLE.ADMIN) {
      return true;
    }
    else {
      Swal.fire({
        title: 'Error!',
        text: 'No tienes permiso de Administrador',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return false;
    }
  }
  else return false;
};