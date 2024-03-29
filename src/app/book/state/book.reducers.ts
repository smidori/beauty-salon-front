
import { createReducer, on } from "@ngrx/store";
import { Book, BookAvailableResponse } from "../model/book.interface";
import { setBookList, addBookState, updateBookState, deleteBookState, setBookSlotList, addBookError, clearBookError } from "./book.action";

export interface BookState{
    books: ReadonlyArray<Book>;
    error: string | null; 
}

export const initialState: BookState = {
    books: [],
    error: null
}

export const bookReducer = createReducer(
    initialState,
    on(setBookList, (state, { books }) => { return {...state, books}}),
    on(addBookState, (state, {book}) => {return {...state, books:[...state.books, book], error: null}}),
    on(updateBookState, (state, {book}) => {
        return {...state, books: state.books.map(data => data.id === book.id ? book : data)}
      }),
    on(deleteBookState, (state, {bookId}) => 
    {return {...state, books: state.books.filter(data => data.id != bookId)}
    }),
    //update the state with the message error
    on(addBookError, (state, { error }) => ({ ...state, error })),
    
    on(clearBookError, (state) => ({ ...state, error: null }))
)

export interface BookSlotState{
    bookSlots: ReadonlyArray<BookAvailableResponse>;
}

export const initialSlotState: BookSlotState = {
    bookSlots:[]
}

export const bookSlotReducer = createReducer(
    initialSlotState,
    on(setBookSlotList, (state, { bookSlots }) => {
        console.log('Reducer book slots state:', {...state, bookSlots});
        return {...state, bookSlots};
      })

    //on(setBookSlotList, (state, { bookSlots }) => { return {...state, bookSlots}}),
    // on(addBookState, (state, {book}) => {return {...state, books:[...state.books, book]}}),
    // on(updateBookState, (state, {book}) => {
    //     return {...state, books: state.books.map(data => data.id === book.id ? book : data)}
    //   }),
    // on(deleteBookState, (state, {bookId}) => 
    // {return {...state, books: state.books.filter(data => data.id != bookId)}
    // }),
)