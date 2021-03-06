import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { AuthService } from './authService/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  // add the service we need
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // handle any redirects if a user isn't authenticated
    if (this.auth.currentUser)
    {
      return true;
    }  
      this.router.navigate(['login']);

    //new comppnent
    return false;
  
  };
}
