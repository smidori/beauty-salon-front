import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticateService){}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const Authorization = localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '';
    const token = localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '';
    
    if(token && this.authService.isTokenExpired(token)){
      //REFRESH TOKEN OR DO THE LOGOUT
      this.authService.logout();
    }

    if(httpRequest.url.includes('api'))
        return next.handle(httpRequest.clone({ setHeaders: {Authorization } }));
    else
        return next.handle(httpRequest);
  }
}