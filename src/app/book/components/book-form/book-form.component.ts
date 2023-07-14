import { BookSearchParams } from './../../model/bookSearchParams.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Treatment } from 'src/app/treatment/models/treatment.interface';
import { User } from 'src/app/user/models/user.interface';
import { Book, BookAvailableResponse } from '../../model/book.interface';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { BookActions } from '../../state/book.action';
import { selectSlots } from '../../state/book.selectors';
import { take, switchMap, interval } from 'rxjs';

@Component({
  selector: 'book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  @Input() selectedBook: Book | null = null;
  @Input() actionButtonLabel: string = "Create";
  @Input() treatments: ReadonlyArray<Treatment> = [];
  @Input() users: ReadonlyArray<User> = [];

  @Output() action = new EventEmitter();
  searchForm: FormGroup;
  resultForm: FormGroup;

  selectedTreatment: Treatment | null = null;


  bookSlots: ReadonlyArray<BookAvailableResponse> = [];
  bookSlots$ = this.store.select(selectSlots());


  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.searchForm = this.fb.group({
      id: [null],
      userId: [null],
      userName: [null],
      dateBook: [null],
      //treatments: [[]],
      startTimeBook: [null],
      finishTimeBook: [null],
      treatment: [null],
    });

    this.resultForm = this.fb.group({
      bookSlots: this.fb.array([]),
    })
  }

  searchSlots() {
    console.log("++++++++++++++++++++++ chamada search slots +++++++++++++++++++++++++++")
    const bs: BookSearchParams = {
      user: null,
      treatment: this.searchForm.get('treatment')?.value,
      //dateBook: this.searchForm.get('dateBook')?.value.toLocaleDateString('en-IE'),
      
      dateBook: this.searchForm.get('dateBook')?.value.toISOString(),
    };
    console.log("form dateBook => " + this.searchForm.get('dateBook')?.value);
    console.log("dateBook => " + bs.dateBook);
    //console.log("BookSearchParams => " + JSON.stringify(bs));
    console.log("bs.dateBook:", bs.dateBook);

    this.store.dispatch({ type: BookActions.GET_BOOK_SLOT_LIST, payload: bs });
    console.log("Ação despachada: GET_BOOK_SLOT_LIST, payload:", bs.dateBook);


    // this.bookSlots$.pipe(
    //   take(1),
    //   switchMap((data) => {
    //     console.log("Valor de bookSlots: ", data);
    //     this.bookSlots = data;
    //     return this.bookSlots$;
    //   })
    // ).subscribe((data) => {
    //   console.log("Valor final de bookSlots: ", this.bookSlots);
    //   let count = 0; // Variável de controle para contar o número de vezes que o código foi executado

    //   const intervalId = setInterval(() => {
    //     console.log(count + "this.bookSlots => ", this.bookSlots);
    //     count++;
      
    //     if (count === 10) {
    //       clearInterval(intervalId); // Limpa o intervalo após 10 execuções
    //     }
    //   }, 2000);

      // if (this.bookSlots && this.bookSlots.length > 0) {
      //   console.log("if this.bookSlots ", this.bookSlots);

      // } else {
      //   console.log("else this.bookSlots ", this.bookSlots);
      // }
    // });


    this.bookSlots$.subscribe((data) => {
      this.bookSlots = data;
      // console.log("============= chamada subscribe bookSlots ==========================")
      // this.bookSlots = data;
      // let count = 0; // Variável de controle para contar o número de vezes que o código foi executado

      // const intervalId = setInterval(() => {
      //   console.log(count + "this.bookSlots => ", this.bookSlots);
      //   count++;
      
      //   if (count === 10) {
      //     clearInterval(intervalId); // Limpa o intervalo após 10 execuções
      //   }
      // }, 2000);

    })
  }

  toArray(obj: any): any[] {
    return Array.from(obj);
  }

  getBookSlotsSize(bookSlots: any): number {
    return Object.keys(bookSlots).length;
  }

  ngOnInit(): void {
    this.checkAction();
  }

  checkAction() {
    if (this.selectedBook) {
      this.actionButtonLabel = "Update";
      this.patchDataValues()
    }
  }

  patchDataValues() {

    if (this.selectedBook) {
      //console.log(JSON.stringify("book => " + this.selectedBook.firstName));
      this.searchForm.patchValue(this.selectedBook);
    }

  }



  compareTreatmentObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  emitAction() {
    this.action.emit({ value: this.searchForm.value, action: this.actionButtonLabel })
  }

  clear() {
    this.searchForm.reset();
  }
}


