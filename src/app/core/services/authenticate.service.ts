import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(data: {login: string, password: string}): Observable<any> {
    console.log("login param ----->"+ JSON.stringify(data));
    var log = this.http.post<any>(`${environment.apiURL}/auth/signin`, data).pipe(
      tap((data: any) => data),
      catchError(err => throwError(() => err))
   )
   console.log("login ----->"+ JSON.stringify(log));
      return log
  }

  register(data: {login: string, password: string}): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/auth/signup`, data).pipe(
      tap((data: any) => data),
      catchError(err => throwError(() => err))
   )
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token') ?? '';
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

}