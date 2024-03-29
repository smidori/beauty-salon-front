import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable, tap, throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/user/models/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private authenticationSubject = new Subject<boolean>();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }
 
  //call the endpoint to login in the system
  login(data: { login: string, password: string }): Observable<any> {

    const token = localStorage.getItem('token') ?? '';

    //If the token is expired, clean it and userDetails from localStorage
    if (this.isTokenExpired(token)) {
      localStorage.setItem('token', '');
      localStorage.setItem('userDetails', '');
    }
    //call endpoint
    var log = this.http.post<any>(`${environment.apiURL}/auth/login`, data).pipe(
      tap((data: any) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userDetails', JSON.stringify(data.userDetails));

        // Notify subscribers that the authentication state has changed
        this.authenticationSubject.next(true);
      }),
      catchError(err => throwError(() => err))
    )
    return log
  }

  //call the endpoint to login in the system
  resetPwd(data: { email: string }): Observable<any> {
    //call endpoint
    return this.http.post<any>(`${environment.apiURL}/emails/resetPwd`,data).pipe(
      tap((data: any) => {}),
      catchError(err => throwError(() => err))
    )
  }

  //call the api to register the client in the system
  register(user: User): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/auth/register`, user).pipe(
      //tap((data: any) => data),
      tap((data: any) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userDetails', JSON.stringify(data.userDetails));

        // Notify subscribers that the authentication state has changed
        this.authenticationSubject.next(true);
      }),
      catchError(err => throwError(() => err))
    )
  }

  // Check whether the token is expired
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token') ?? '';
    return !this.jwtHelper.isTokenExpired(token);
  }

  //check if the token is expired
  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.setItem('token', '');
    localStorage.setItem('userDetails', '');

    this.authenticationSubject.next(this.isAuthenticated());
    this.router.navigate(['/treatments/home']);
  }

  //to subscribe in the authentication changes 
  onAuthenticationChange() {
    return this.authenticationSubject.asObservable();
  }

  isAdmin(): boolean {
    if (this.isAuthenticated()) {
      const userDetails: any = localStorage.getItem('userDetails') ?? '';
      if (userDetails) {
        const userDetailsObj = JSON.parse(userDetails);
        if (userDetailsObj?.role === 'ADMIN') {
          return true;
        }
      }
    }
    return false;
  }

  isWorker(): boolean {
    if (this.isAuthenticated()) {
      const userDetails: any = localStorage.getItem('userDetails') ?? '';
      if (userDetails) {
        const userDetailsObj = JSON.parse(userDetails);
        if (userDetailsObj?.role === 'WORKER') {
          return true;
        }
      }
    }
    return false;
  }

  isClient(): boolean {
    if (this.isAuthenticated()) {
      const userDetails: any = localStorage.getItem('userDetails') ?? '';
      if (userDetails) {
        const userDetailsObj = JSON.parse(userDetails);
        if (userDetailsObj?.role === 'CLIENT') {
          return true;
        }
      }
    }
    return false;
  }

  name(): string {
    if (this.isAuthenticated()) {
      const userDetails: any = localStorage.getItem('userDetails') ?? '';
      if (userDetails) {
        const userDetailsObj = JSON.parse(userDetails);
        return userDetailsObj.firstName
      }
    }
    return '';
  }

  userId():number|null {
    if (this.isAuthenticated()) {
      const userDetails: any = localStorage.getItem('userDetails') ?? '';
      if (userDetails) {
        const userDetailsObj = JSON.parse(userDetails);
        return userDetailsObj.id
      }
    }
    return null;
    
  }
}