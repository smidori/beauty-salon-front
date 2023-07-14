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
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  //get data from input
  @Input() selectedBook: Book | null = null;
  @Input() actionButtonLabel: string = "Create";
  @Input() treatments: ReadonlyArray<Treatment> = [];
  @Input() users: ReadonlyArray<User> = [];

  //send the data
  @Output() action = new EventEmitter();

  //variable
  searchForm: FormGroup;
  resultForm: FormGroup;

  selectedTreatment: Treatment | null = null;

  bookSlots: ReadonlyArray<BookAvailableResponse> = [];
  bookSlots$ = this.store.select(selectSlots());

  searchCompleted = false; // used to control when show the results

  minDate = new Date();
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)); //limit the date for 1 year in advance

  //constructor
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
      selectedSlotKey: [null],
      selectedBookSlot: ['']

    })
  }

  //search the available time for this treatment and date
  searchSlots() {
    
    this.searchCompleted = false;
    const bs: BookSearchParams = {
      user: null,
      treatment: this.searchForm.get('treatment')?.value,
      dateBook: this.searchForm.get('dateBook')?.value.toISOString(),
    };

    this.resultForm.get('selectedSlotKey')?.setValue('');
    this.resultForm.get('selectedBookSlot')?.setValue('');

    // console.log("form dateBook => " + this.searchForm.get('dateBook')?.value);
    // console.log("dateBook => " + bs.dateBook);
    // //console.log("BookSearchParams => " + JSON.stringify(bs));
    // console.log("bs.dateBook:", bs.dateBook);

    this.store.dispatch({ type: BookActions.GET_BOOK_SLOT_LIST, payload: bs });
    // console.log("Ação despachada: GET_BOOK_SLOT_LIST, payload:", bs.dateBook);

    this.bookSlots$.subscribe((data) => {
      this.bookSlots = data;
      this.searchCompleted = true;
    })
  }

  //convert object into array
  toArray(obj: any): any[] {
    return Array.from(obj);
  }

  //check the size of the map object
  getBookSlotsSize(bookSlots: any): number {
    return Object.keys(bookSlots).length;
  }

  ngOnInit(): void {
    this.checkAction();
    // Observe the changes in the field 'dateBook'
    this.searchForm.get('dateBook')?.valueChanges.pipe(
      distinctUntilChanged(), // do just when the current value is different from previous one
      filter(() => this.searchForm.get('treatment')?.value !== null) // Check if the field treatment != null
    ).subscribe(() => {
      this.searchSlots();
    });

    // Observe the changes in the field 'treatment'
    this.searchForm.get('treatment')?.valueChanges.pipe(
      distinctUntilChanged(), // do just when the current value is different from previous one
      filter(() => this.searchForm.get('dateBook')?.value !== null) // Check if the field dateBook != null
    ).subscribe(() => {
      this.searchSlots();
    });
  }

  //check is is update or create
  checkAction() {
    if (this.selectedBook) {
      this.actionButtonLabel = "Update";
      this.patchDataValues()
    }
  }

  //copy the values from selectedBook to form
  patchDataValues() {
    if (this.selectedBook) {
      this.searchForm.patchValue(this.selectedBook);
    }
  }


  // compare Treatment Objects
  compareTreatmentObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  //send an action
  emitAction() {
    this.action.emit({ value: this.searchForm.value, action: this.actionButtonLabel })
  }

  //clear the form
  clear() {
    this.searchForm.reset();
  }


  expandedItems: string[] = [];
  selectedBookSlot: any = null;
  
  //selectedSlotKey: string = '';
  selectedSlotKey: number = 0;

selectSlotKey(slotKey: number) {
  this.selectedSlotKey = slotKey;
  const element = document.getElementById('mySelect'); // Replace 'myButton' with the ID of your button element
  if (element) {
    console.log("element =====> " + element)
    element.dispatchEvent(new Event('click'));
  }
}

  

toggleExpand(slotKey: string) {
  if (this.isExpanded(slotKey)) {
    this.expandedItems = this.expandedItems.filter(item => item !== slotKey);
  } else {
    this.expandedItems.push(slotKey);
  }
}

isExpanded(slotKey: string): boolean {
  return this.expandedItems.includes(slotKey);
}

selectBookSlot(bookSlot: any) {
  this.selectedBookSlot = bookSlot;
}

}


