import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }

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

  //check if the token is expired
  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  logout(){
    this.router.navigate(['/login']);
    localStorage.removeItem('token'); 
    console.log("logout isAuthenticated " + this.isAuthenticated())
    const token = localStorage.getItem('token')
    console.log("logout token " + token)
  }



}