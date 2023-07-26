import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, tap, catchError, throwError } from "rxjs"
import { Invoice } from "src/app/invoice/model/invoice.interface"
import { environment } from "src/environments/environment"

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<Invoice[]>{
    console.log('getInvoices => ' + `${environment.apiURL}/invoices`)
    return this.http.get<Invoice[]>(`${environment.apiURL}/invoices`).pipe(
      tap((data: Invoice[]) => data),
      catchError(err => throwError(() => err))
    )
  }

  addInvoice(invoice: Invoice): Observable<Invoice>{
    console.log('addInvoice => ' + `${environment.apiURL}/invoices`)
    console.log('addInvoice invoice => ' + invoice)
    return this.http.post<Invoice>(`${environment.apiURL}/invoices`,invoice).pipe(
      tap((data: Invoice) => data),
      catchError(err => throwError(() => err))
    )
  }

  updateInvoice(id: number, invoice: Invoice): Observable<Invoice>{
    console.log("updateInvoice service ")
    return this.http.put<Invoice>(`${environment.apiURL}/invoices/${id}`,invoice).pipe(
      catchError(err => throwError(() => err))
    )
  }

  deleteInvoice(id:number): Observable<Invoice>{
    return this.http.delete<Invoice>(`${environment.apiURL}/invoices/${id}`).pipe(
      catchError(err => throwError(() => err))
    )
  }
}
