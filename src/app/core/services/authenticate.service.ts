import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from 'src/app/user/models/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }

  login(data: {login: string, password: string}): Observable<any> {
    console.log("login param ----->"+ JSON.stringify(data));
    var log = this.http.post<any>(`${environment.apiURL}/auth/login`, data).pipe(
      tap((data: any) => data),
      catchError(err => throwError(() => err))
   )
   console.log("login ----->"+ JSON.stringify(log));
      return log
  }

  register(user: User): Observable<any> {
    console.log("register " + JSON.stringify(user));
    return this.http.post<any>(`${environment.apiURL}/auth/register`, user).pipe(
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
    localStorage.setItem('token','');
    this.router.navigate(['/login']);
  }



}