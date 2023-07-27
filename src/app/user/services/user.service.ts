import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    console.log('getUsers => ' + `${environment.apiURL}/users`)
    return this.http.get<User[]>(`${environment.apiURL}/users`).pipe(
      tap((data: User[]) => data),
      catchError(err => throwError(() => err))
    )
  }

  getUsersByRole(role: string): Observable<User[]>{
    console.log('getUsersByRole => ' + `${environment.apiURL}/users/role/${role}`)
    return this.http.get<User[]>(`${environment.apiURL}/users/role/${role}`).pipe(
      tap((data: User[]) => data),
      catchError(err => throwError(() => err))
    )
  }

  addUser(user: User): Observable<User>{
    return this.http.post<User>(`${environment.apiURL}/users`,user).pipe(
      tap((data: User) => data),
      catchError(err => throwError(() => err))
    )
  }

  updateUser(id: number, user: User): Observable<User>{
    console.log("updateUser service ")
    return this.http.put<User>(`${environment.apiURL}/users/${id}`,user).pipe(
      catchError(err => throwError(() => err))
    )
  }

  deleteUser(id:number): Observable<User>{
    return this.http.delete<User>(`${environment.apiURL}/users/${id}`).pipe(
      catchError(err => throwError(() => err))
    )
  }
}
