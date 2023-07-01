import { Availability } from './../models/availability.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  constructor(private http: HttpClient) { }
  getAvailabilities(): Observable<Availability[]> {
    console.log('getAvailabilities => ' + `${environment.apiURL}/availabilities`)
    return this.http.get<Availability[]>(`${environment.apiURL}/availabilities`).pipe(
      tap((data: Availability[]) => data),
      catchError(err => throwError(() => err))
    )
  }

}
