import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookState } from "./book.reducers";

export const selectBookState = createFeatureSelector<BookState>('bookState')

export const selectBooks = () => createSelector(
    selectBookState,
    (state: BookState) => state.books
)

export const selectBook = (id: number) => createSelector(
    selectBookState,
    (state: BookState) => {
        console.log('state.books => ', state.books);
        const book = state.books.find(d => {      
            return d.id == id;
          });
        console.log("book ==> " + book);
        return book;
    }
);


export const selectSlots = () => createSelector(
    selectBookState,
    (state: BookState) => state.books
)