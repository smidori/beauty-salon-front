import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Treatment } from '../models/treatment.interface';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  constructor(private http: HttpClient) { }

  getTreatments():Observable<Treatment[]>{
    console.log('getTreatments => ' + `${environment.apiURL}/treatments`)
    return this.http.get<Treatment[]>(`${environment.apiURL}/treatments`).pipe(
      tap((data: Treatment[]) => data),
      catchError(err => throwError(() => err))
    )
  }
}
