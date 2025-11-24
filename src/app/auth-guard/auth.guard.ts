import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authservice = inject(AuthService);
  return authservice.isUserLoggedIn().pipe(
    map(logged => logged ? true: router.createUrlTree(["login"])),
    catchError(() => of(router.createUrlTree(["login"])))
  );
};
  
