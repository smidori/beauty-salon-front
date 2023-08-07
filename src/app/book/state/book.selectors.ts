import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookSlotState, BookState } from "./book.reducers";

export const selectBookState = createFeatureSelector<BookState>('bookState')
export const selectBookSlotState = createFeatureSelector<BookSlotState>('bookSlotState')


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


// export const selectSlots = () => createSelector(
//     selectBookSlotState,
//     (state: BookSlotState) => state.bookSlots
// )

export const selectSlots = () => createSelector(
    selectBookSlotState,
    (state: BookSlotState) => {
      console.log('Slots state:', state);
      return state.bookSlots;
    }
  );
  
  export const selectError = createSelector(
    selectBookState,
    (state: BookState) => state.error
  );