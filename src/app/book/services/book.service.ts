import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book, BookAvailableResponse } from '../model/book.interface';
import { BookSearchParams } from '../model/bookSearchParams.interface';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }
  getBooks(): Observable<Book[]> {
    console.log('getBooks => ' + `${environment.apiURL}/books`)
    return this.http.get<Book[]>(`${environment.apiURL}/books`).pipe(
      tap((data: Book[]) => data),
      catchError(err => throwError(() => err))
    )
  }

  // getBookSlots(book: Book): Observable<Book[]> {
    
  //   console.log("getBookSlots => " + `${environment.apiURL}/books/availability`);
  //   return this.http.get<Book[]>(`${environment.apiURL}/books/availability`, { params: book as any}).pipe(
  //     tap((data: Book[]) => data),
  //     catchError(err => throwError(err))
  //   );
  // }

  getBookSlots(book: BookSearchParams): Observable<BookAvailableResponse> {
    console.log("getBookSlots => " + `${environment.apiURL}/books/availability`);
    console.log("Params => " + JSON.stringify(book.dateBook));
    return this.http.post<BookAvailableResponse>(`${environment.apiURL}/books/availability`, book).pipe(
      //tap((data: Book[]) => data),
      tap((data: BookAvailableResponse) => {
        console.log("Response slots: ========> ", data);
      }),
      catchError(err => throwError(() => err))
    );
  }

  addBook(book: Book): Observable<Book>{
    console.log("Service => Post book => " + `${environment.apiURL}/books`);
    return this.http.post<Book>(`${environment.apiURL}/books`,book).pipe(
      tap((data: Book) => data),
      catchError(err => throwError(() => err))
    )
  }

  updateBook(id: number, book: Book): Observable<Book>{
    console.log("Service => Update book => " + JSON.stringify(book));
    return this.http.put<Book>(`${environment.apiURL}/books/${id}`,book).pipe(
      catchError(err => throwError(() => err))
    )
  }

  deleteBook(id:number): Observable<Book>{
    return this.http.delete<Book>(`${environment.apiURL}/books/${id}`).pipe(
      catchError(err => throwError(() => err))
    )
  }

}

