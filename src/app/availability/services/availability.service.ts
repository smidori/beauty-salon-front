import { Availability } from './../models/availability.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  
  private errorSubject = new Subject<string>();

  constructor(private http: HttpClient) { }
  getAvailabilities(): Observable<Availability[]> {
    console.log('getAvailabilities => ')
    return this.http.get<Availability[]>(`${environment.apiURL}/availabilities`).pipe(
      tap((data: Availability[]) => data),
      catchError(err => throwError(() => err))
    )
  }

  addAvailability(availability: Availability): Observable<Availability>{
    console.log("Post availability => " + `${environment.apiURL}/availabilities`);
    return this.http.post<Availability>(`${environment.apiURL}/availabilities`,availability).pipe(
      tap((data: Availability) => data),
      catchError(err => throwError(() => err))
    )
  }

  updateAvailability(id: number, availability: Availability): Observable<Availability>{
    console.log("====> update availability => " + JSON.stringify(availability));
    return this.http.put<Availability>(`${environment.apiURL}/availabilities/${id}`,availability).pipe(
      catchError(err => throwError(() => err))
    )
  }

  deleteAvailability(id:number): Observable<Availability>{
    return this.http.delete<Availability>(`${environment.apiURL}/availabilities/${id}`).pipe(
      catchError((err) => {
        this.errorSubject.next(err.error.message);
        return throwError(() => err);
      }) 
    )
  }
  
  onError() {
    return this.errorSubject.asObservable();
  }

}
