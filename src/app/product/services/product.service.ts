import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/invoice/model/invoice.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    console.log('getProducts => ' + `${environment.apiURL}/products`)
    return this.http.get<Product[]>(`${environment.apiURL}/products`).pipe(
      tap((data: Product[]) => data),
      catchError(err => throwError(() => err))
    )
  }

  addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(`${environment.apiURL}/products`,product).pipe(
      tap((data: Product) => data),
      catchError(err => throwError(() => err))
    )
  }

  updateProduct(id: number, product: Product): Observable<Product>{
    console.log("updateProduct service ")
    return this.http.put<Product>(`${environment.apiURL}/products/${id}`,product).pipe(
      catchError(err => throwError(() => err))
    )
  }

  deleteProduct(id:number): Observable<Product>{
    return this.http.delete<Product>(`${environment.apiURL}/products/${id}`).pipe(
      catchError(err => throwError(() => err))
    )
  }
}
