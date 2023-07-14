import { createAction, props } from "@ngrx/store";
import { Book, BookAvailableResponse } from "../model/book.interface";
import { BookSearchParams } from "../model/bookSearchParams.interface";

export enum BookActions{
    GET_BOOK_LIST = '[Book] Get Book list',
    SET_BOOK_LIST = '[Book] Set Book list',
    ADD_BOOK_API = '[Book] Add Book api',
    ADD_BOOK_STATE = '[Book] Add Book state',
    UPDATE_BOOK_API = '[Book] Add Book api',
    UPDATE_BOOK_STATE = '[Book] Add Book state',
    DELETE_BOOK_API = '[Book] Delete Book api',
    DELETE_BOOK_STATE = '[Book] Delete Book state',


    GET_BOOK_SLOT_LIST = '[Book] Get Book  Slot list',
    SET_BOOK_SLOT_LIST = '[Book] Set Book Slot list',
}


export const getBookList = createAction(
    BookActions.GET_BOOK_LIST
);

export const setBookList = createAction(
    BookActions.SET_BOOK_LIST,
    props<{books:ReadonlyArray<Book>}>()
)

export const getBookSlotList = createAction(
    BookActions.GET_BOOK_SLOT_LIST,props<{book:BookSearchParams}>()
);

export const setBookSlotList = createAction(
    BookActions.SET_BOOK_SLOT_LIST,
    props<{bookSlots: ReadonlyArray<BookAvailableResponse>}>()
)

export const addBookState = createAction(
    BookActions.ADD_BOOK_STATE, props<{book: Book}>()
);

export const updateBookState = createAction(
    BookActions.UPDATE_BOOK_STATE,
    props<{ book: Book }>()
);


export const deleteBookState = createAction(
    BookActions.DELETE_BOOK_STATE, props<{bookId: number}>()
)