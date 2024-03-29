import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AuthenticateService } from '../services/authenticate.service';
import jwtDecode from 'jwt-decode';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticateService) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const Authorization = localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '';
    const token = localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '';

    // try {
    //   const tokenData:any = jwtDecode(token);
    //   console.log('Token decodificado:', tokenData);

    //   const iatDate = new Date(tokenData.iat * 1000); // Multiply by 1000 to convert to milliseconds
    //   console.log('Issued At (iat):', iatDate.toUTCString());
    //   const expDate = new Date(tokenData.exp * 1000); // Multiply by 1000 to convert to milliseconds
    //   console.log('Expiration (exp):', expDate.toUTCString());
    // } catch (error) {
    //   console.error('Erro ao decodificar o token:', error);
    // }
    

    if (token && this.authService.isTokenExpired(token)) {
      console.log("intercept token expired ");
      //REFRESH TOKEN OR DO THE LOGOUT
      this.authService.logout();
    }

    if (httpRequest.url.includes('api')) {
      return next.handle(httpRequest.clone({ setHeaders: { Authorization } }));
    } else {
      return next.handle(httpRequest);
    }

  }
}