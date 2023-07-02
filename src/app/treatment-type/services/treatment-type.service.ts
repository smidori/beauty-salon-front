import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
//import { TreatmentType } from 'src/app/treatment/models/treatment-type.interface';
import { environment } from 'src/environments/environment';
import { TreatmentType } from '../models/treatment-type.interface';

@Injectable({
  providedIn: 'root'
})
export class TreatmentTypeService {

  constructor(private http: HttpClient) { }

  getTreatmentTypes():Observable<TreatmentType[]>{
    console.log('getTreatmentTypes => ' + `${environment.apiURL}/treatment-types`)
    return this.http.get<TreatmentType[]>(`${environment.apiURL}/treatment-types`).pipe(
      tap((data: TreatmentType[]) => data),
      catchError(err => throwError(() => err))
    )
  }

  addTreatmentType(treatmentType: TreatmentType): Observable<TreatmentType>{
    console.log("Post treatmentType => " + `${environment.apiURL}/treatment-types`);
    return this.http.post<TreatmentType>(`${environment.apiURL}/treatment-types`,treatmentType).pipe(
      tap((data: TreatmentType) => data),
      catchError(err => throwError(() => err))
    )
  }

  updateTreatmentType(id: number, treatmentType: TreatmentType): Observable<TreatmentType>{
    return this.http.put<TreatmentType>(`${environment.apiURL}/treatment-types/${id}`,treatmentType).pipe(
      catchError(err => throwError(() => err))
    )
  }

  deleteTreatmentType(id:number): Observable<TreatmentType>{
    return this.http.delete<TreatmentType>(`${environment.apiURL}/treatment-types/${id}`).pipe(
      catchError(err => throwError(() => err))
    )
  }
}
