import { BookFilterParams } from './../model/bookSearchParams.interface';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, EMPTY, tap, of } from "rxjs";
import { Book } from "../model/book.interface";
import { BookService } from "../services/book.service";
import { BookActions } from "./book.action";
import { BookSearchParams } from "../model/bookSearchParams.interface";

@Injectable()
export class BookEffects {
    constructor(
        private actions$: Actions,
        private bookService: BookService,
        private router: Router
    ) { }


    // getBooks$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(BookActions.GET_BOOK_LIST),
    //         mergeMap(() => this.bookService.getBooks()
    //             .pipe(
    //                 map(books => ({ type: BookActions.SET_BOOK_LIST, books })),
    //                 catchError(() => EMPTY)
    //             ))
    //     )
    // }, { dispatch: true }
    // );

    getBooks$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BookActions.GET_BOOK_LIST),
            mergeMap((data: {type:string, payload: BookFilterParams}) => 
                this.bookService.getBooksByFilter(data.payload)
                .pipe(
                    map(books => ({ type: BookActions.SET_BOOK_LIST, books })),
                    catchError(() => EMPTY)
                ))
        )
    }, { dispatch: true }
    );


    getBookSlots$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BookActions.GET_BOOK_SLOT_LIST),
            mergeMap((data: { type: string, payload: BookSearchParams }) => 
            this.bookService.getBookSlots(data.payload)
                .pipe(
                    map(bookSlots => ({ type: BookActions.SET_BOOK_SLOT_LIST, bookSlots })),
                    catchError(() => EMPTY)
                ))
        )
    }, { dispatch: true }
    );

    addBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BookActions.ADD_BOOK_API),
            mergeMap((data: { type: string, payload: Book }) => this.bookService.addBook(data.payload)
                .pipe(
                    map(books => ({ type: BookActions.ADD_BOOK_STATE, book: data.payload })),
                    tap(() => this.router.navigate(["books"])),
                    //catchError(() => EMPTY)
                    catchError((error) => of({ type: BookActions.ADD_BOOK_ERROR, error: error.error.message }))
                ))
        )
    }, { dispatch: true })

    updateBook$ = createEffect(() => {
         return this.actions$.pipe(
            ofType(BookActions.UPDATE_BOOK_API),
            // tap((data: { type: string, payload: Book }) => {
            //     console.log('Update Book effect triggered:', data);
            //   }),
            mergeMap((data: {type: string, payload: Book}) =>
            this.bookService.updateBook(data.payload.id, data.payload)
            .pipe(
                map(books => ({type: BookActions.UPDATE_BOOK_STATE, book: data.payload})),
                tap(() => this.router.navigate(["books"])),
                catchError(() => EMPTY)
            ))
        )
    }, {dispatch: true})

    deleteBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BookActions.DELETE_BOOK_API),
            mergeMap((data: {payload: number }) => this.bookService.deleteBook(data.payload)
            .pipe(
                map(() => ({type: BookActions.DELETE_BOOK_STATE, bookId: data.payload})),
                catchError(() => EMPTY)
            ))
        )
    })

    
}