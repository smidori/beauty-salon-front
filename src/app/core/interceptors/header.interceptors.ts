import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticateService) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("intercept httpRequest " + JSON.stringify(httpRequest));
    const Authorization = localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '';
    const token = localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '';
    console.log("intercept send to " + Authorization);

    if (token && this.authService.isTokenExpired(token)) {
      //REFRESH TOKEN OR DO THE LOGOUT
      this.authService.logout();
    }

    console.log("include authorization ???????")
    if (httpRequest.url.includes('api')) {
      console.log("yes")
      return next.handle(httpRequest.clone({ setHeaders: { Authorization } }));
    } else {
      console.log("yes")
      return next.handle(httpRequest);
    }

  }
}