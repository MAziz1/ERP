import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import LS from './localStorage';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = LS.get('currentUser');
    if (currentUser && currentUser.token) {
      let tokenHeader = `Bearer ${currentUser.token}`
      console.log("TCL: JwtInterceptor -> constructor -> tokenHeader", tokenHeader)
      request = request.clone({
        setHeaders: {
          Authorization: tokenHeader
        }
      });
    }
    return next.handle(request);
  }
}
