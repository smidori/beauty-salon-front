import { BookSearchParams } from './../../model/bookSearchParams.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Treatment } from 'src/app/treatment/models/treatment.interface';
import { User } from 'src/app/user/models/user.interface';
import { Book } from '../../model/book.interface';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { BookActions } from '../../state/book.action';
import { selectSlots } from '../../state/book.selectors';

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
  form: FormGroup;
  selectedTreatment: Treatment | null = null;


  bookSlots: ReadonlyArray<Book> = [];
  bookSlots$ = this.store.select(selectSlots());


  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.form = this.fb.group({
      id: [null],
      userId: [null],
      userName: [null],
      dateBook: [null],
      //treatments: [[]],
      startTimeBook:[null],
      finishTimeBook:[null],
      treatment: [null],

    });
  }

  searchSlots(){
    const bs: BookSearchParams = {
      user: null,
      treatment: this.form.get('treatment')?.value,
      dateBook: this.form.get('dateBook')?.value,
    };

    //this.store.dispatch({type: BookActions.GET_BOOK_SLOT_LIST, payload: this.form.value});
    this.store.dispatch({type: BookActions.GET_BOOK_SLOT_LIST, payload: bs});
    this.bookSlots$.subscribe((data) => {
      this.bookSlots = data;
      console.log("data slots => " + JSON.stringify(data));
      console.log("data bookSlots => " + JSON.stringify(this.bookSlots));
    })

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
      this.form.patchValue(this.selectedBook);
    }

  }



  compareTreatmentObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  emitAction() {
    this.action.emit({ value: this.form.value, action: this.actionButtonLabel })
  }

  clear() {
    this.form.reset();
  }
}


