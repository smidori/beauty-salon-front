import { createReducer, on } from "@ngrx/store";
import { Book } from "../model/book.interface";
import { setBookList, addBookState, updateBookState, deleteBookState } from "./book.action";

export interface BookState{
    books: ReadonlyArray<Book>;
}

export const initialState: BookState = {
    books: []
}

export const bookReducer = createReducer(
    initialState,
    on(setBookList, (state, { books }) => { return {...state, books}}),
    on(addBookState, (state, {book}) => {return {...state, books:[...state.books, book]}}),
    on(updateBookState, (state, {book}) => {
        return {...state, books: state.books.map(data => data.id === book.id ? book : data)}
      }),
    on(deleteBookState, (state, {bookId}) => 
    {return {...state, books: state.books.filter(data => data.id != bookId)}
    }),
)