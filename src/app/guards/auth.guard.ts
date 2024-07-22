import { afterNextRender, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';

export const AuthGuard: CanActivateFn = ({ routeConfig }, _) => {
  const utils = inject(UtilsService);
  const router = inject(Router);
  const path = routeConfig?.path;
  if (path == 'login' || path == 'register') {
    return utils.is_logged ? router.createUrlTree(['profile']) : true;
  }
  return utils.is_logged ? true : router.createUrlTree(['login']);
};
