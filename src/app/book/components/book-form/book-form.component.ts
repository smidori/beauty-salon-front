import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateFilterFn } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { AppState } from 'src/app/state/app.state';
import { Treatment } from 'src/app/treatment/models/treatment.interface';
import { User } from 'src/app/user/models/user.interface';
import { BookStatus, bookStatusLabels } from '../../model/book-status.enum';
import { Book, BookAvailableResponse } from '../../model/book.interface';
import { BookActions } from '../../state/book.action';
import { selectSlots } from '../../state/book.selectors';
import { BookSearchParams } from './../../model/bookSearchParams.interface';

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
  bookForm: FormGroup;

  selectedTreatment: Treatment | null = null;

  bookSlots: ReadonlyArray<BookAvailableResponse> = [];
  bookSlots$ = this.store.select(selectSlots());

  searchCompleted = false; // used to control when show the results

  //period to do the agenda from tomorrow til 1 year ahead
  minDate = new Date(new Date().setDate(new Date().getDate() + 1));
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)); //limit the date for 1 year in advance

  isSlotSelected: boolean = false;
  bookStatus = BookStatus;
  selectedBookSlot: any = null;
  selectedSlotKey: number = 0;

  //constructor
  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.searchForm = this.fb.group({
      id: [null],
      userId: [null],
      userName: [null],
      dateBook: [null],
      startTimeBook: [null],
      finishTimeBook: [null],
      treatment: [null],
    });

    this.resultForm = this.fb.group({
      bookSlots: this.fb.array([]),
      selectedSlotKey: [null],
      selectedBookSlot: ['']
    });

    this.bookForm = this.fb.group({
      id: [null],
      treatmentId: [null],
      dateBook: [null],
      startTimeBook: [''],
      finishTimeBook: [''],
      workerUserId: [null],
      treatmentName: [''],
      workerUserFirstName: [null],
      workerUserLastName: [null],
      clientUserFirstName: [null],
      clientUserLastName: [null],
      clientUserId: [null],
      observation: [''],
      status: [''],
      createdDate: [null],
    });

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

  //search the available time for this treatment and date
  searchSlots() {
    this.selectedBookSlot = null;
    this.searchCompleted = false;
    const bs: BookSearchParams = {
      user: null,
      treatment: this.searchForm.get('treatment')?.value,
      dateBook: this.searchForm.get('dateBook')?.value.toISOString(),
    };

    this.store.dispatch({ type: BookActions.GET_BOOK_SLOT_LIST, payload: bs });

    this.bookSlots$.subscribe((data) => {
      this.bookSlots = data;

      setTimeout(() => {
        this.searchCompleted = true;
      }, 500);

    })
  }


  //create the booking
  booking() {
    const bookDetails = this.resultForm.get('selectedBookSlot')?.value;
    this.bookForm.get('treatmentId')?.setValue(this.searchForm.get('treatment')?.value.id);
    this.bookForm.get('dateBook')?.setValue(this.searchForm.get('dateBook')?.value);
    this.bookForm.get('startTimeBook')?.setValue(bookDetails.startTimeBook);
    this.bookForm.get('finishTimeBook')?.setValue(bookDetails.finishTimeBook);
    this.bookForm.get('workerUserId')?.setValue(bookDetails.userId);
    this.bookForm.get('treatmentName')?.setValue(this.searchForm.get('treatment')?.value.name);
    if (this.actionButtonLabel === 'Create') {
      this.bookForm.get('status')?.setValue('BOOKED');
    }

    console.log("------- booking this.bookForm => " + JSON.stringify(this.bookForm.value));

    this.emitAction();
  }
  updateStatus() {
    this.emitAction();
  }

  //convert object into array
  toArray(obj: any): any[] {
    return Array.from(obj);
  }

  //check the size of the map object
  getBookSlotsSize(bookSlots: any): number {
    return Object.keys(bookSlots).length;
  }

  //check if is update or create
  checkAction() {
    console.log(" -------- checkAction this.selectedBook " + JSON.stringify(this.selectedBook));
    if (this.selectedBook) {
      this.actionButtonLabel = "Update";
      this.patchDataValues();
      this.bookForm.get('status')?.setValue(this.selectedBook.status);

    }
  }

  //copy the values from selectedBook to bookForm
  patchDataValues() {
    if (this.selectedBook) {
      this.bookForm.patchValue(this.selectedBook);
    }
  }


  // compare Treatment Objects
  compareTreatmentObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  //send an action
  emitAction() {
    //this.action.emit({ value: this.searchForm.value, action: this.actionButtonLabel })
    this.action.emit({ value: this.bookForm.value, action: this.actionButtonLabel })
  }

  //clear the form
  clear() {
    this.searchForm.reset();
  }

  //select the time
  selectSlotKey(slotKey: number) {
    this.selectedBookSlot = null;
    this.selectedSlotKey = slotKey;
  }


  //assign the value once the professional is selected
  selectBookSlot(bookSlot: any) {
    this.selectedBookSlot = bookSlot;
  }

  //don't let the sunday be selected
  sundayFilter: DateFilterFn<Date | null> = (timestamp: Date | null): boolean => {
    if (!timestamp) {
      return true;
    }
    const day = new Date(timestamp).getDay();
    return day !== 0; // return true in case isn't sunday 
  };

  // get the values from enum BookStatus 
  getBookStatusValues(): string[] {
    return Object.keys(bookStatusLabels);
  }

  // get the name in enum BookStatus
  getStatusName(statusValue: string): string {
    return bookStatusLabels[statusValue];
  }

}