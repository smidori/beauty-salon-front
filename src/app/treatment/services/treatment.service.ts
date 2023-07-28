import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Treatment } from '../models/treatment.interface';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {


  private errorSubject = new Subject<string>();


  constructor(private http: HttpClient) { }

  getTreatments(): Observable<Treatment[]> {
    console.log('getTreatments => ' + `${environment.apiURL}/treatments`)
    return this.http.get<Treatment[]>(`${environment.apiURL}/treatments`).pipe(
      tap((data: Treatment[]) => data),
      catchError(err => throwError(() => err))
    )
  }

  addTreatment(treatment: Treatment): Observable<Treatment> {
    console.log("Post treatment => " + `${environment.apiURL}/treatments`);
    return this.http.post<Treatment>(`${environment.apiURL}/treatments`, treatment).pipe(
      tap((data: Treatment) => data),
      catchError(err => throwError(() => err))
    )
  }

  updateTreatment(id: number, treatment: Treatment): Observable<Treatment> {
    return this.http.put<Treatment>(`${environment.apiURL}/treatments/${id}`, treatment).pipe(
      catchError(err => throwError(() => err))
    )
  }

  deleteTreatment(id: number): Observable<Treatment> {
    return this.http.delete<Treatment>(`${environment.apiURL}/treatments/${id}`).pipe(
      catchError((err) => {
        this.errorSubject.next(err.error.message);
        return throwError(() => err);
      })          
    );
  }

  // deleteTreatment(id: number): Observable<Treatment> {
  //   return this.http.delete<Treatment>(`${environment.apiURL}/treatments/${id}`).pipe(
  //     tap(
  //       (data) => {
  //         // Aqui você pode realizar ações específicas quando a chamada for bem-sucedida.
  //         console.log('Successful response:', data);
  //       },
  //       (error) => {
  //         // Aqui você pode realizar ações quando ocorrer um erro na chamada.
  //         console.error('Error occurred during deleteTreatment:', error);
  //         this.errorSubject.next(error.error.message); // Chame o método this.errorSubject.next() em caso de erro.
  //       }
  //     )
  //   );
  // }

  onError() {
    return this.errorSubject.asObservable();
  }
}
