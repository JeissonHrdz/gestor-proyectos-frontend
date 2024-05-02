import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../Service/login.service';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService)
  const router = inject(Router)
  if (loginService.currentUserLoginOn.value) {
    return true
  } else {
    return router.createUrlTree(['/login'])
  }


};

export const authGuardLogin: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService)
  const router = inject(Router)
  if (!loginService.currentUserLoginOn.value) {
    return true
  } else {
    return router.createUrlTree(['/dashboard'])
  }


};

