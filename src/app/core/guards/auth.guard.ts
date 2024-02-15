import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state):Promise<boolean|UrlTree> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isAuth = await authService.verifyToken(); 
  console.log("isAuth: ", isAuth);
  
  return isAuth ? true : router.createUrlTree(['auth']);
};
