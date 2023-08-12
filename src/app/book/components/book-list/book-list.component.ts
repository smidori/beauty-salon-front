import { BookService } from 'src/app/book/services/book.service';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TableActions } from 'src/app/shared/enums/table-actions.enum';
import { User } from 'src/app/user/models/user.interface';
import { Book } from '../../model/book.interface';
import { BookStatus, bookStatusLabels } from '../../model/book-status.enum';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/user/services/user.service';
import { catchError, tap } from 'rxjs';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';
import { BookActions } from '../../state/book.action';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { selectBooks } from '../../state/book.selectors';
import { BookFilterParams } from '../../model/bookSearchParams.interface';

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  @Input() headers: Array<{ headerName: string, fieldName: keyof Book, userName?: (keyof User)[] }> = []
  @Input() books: ReadonlyArray<Book> = [];
  @Output() book = new EventEmitter<{ obj: any, action: TableActions }>();

  //@Output() searchBooks = new EventEmitter<{book: BookFilterParams, action:TableActions}>();

  headerFields: string[] = [];

  workers: User[] = [];
  clients: User[] = [];
  searchForm: FormGroup;
  books$ = this.store.select(selectBooks());
  isClient = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private bookService: BookService,
    private authService: AuthenticateService,
    private dialog: MatDialog,
    private store: Store<AppState>) {

    this.searchForm = this.fb.group({
      dateBook: [null],
      workerId: [null],
      clientId: [null],
      bookStatus: [null],
      filterDateBy: ['='],
    });


    const currentDate = new Date();
    var today = currentDate.toISOString();

    if (this.authService.isAdmin() || this.authService.isWorker()) {
      this.searchForm.get('dateBook')?.setValue(today);
    } else {//client
      this.searchForm.get('bookStatus')?.setValue(BookStatus.BOOKED);;
    }


    this.loadUsersByRole("CLIENT");
    this.loadUsersByRole("WORKER");
  }

  ngOnInit(): void {
    this.getHeaderFields();
    this.isClient = this.authService.isClient();
  }

  searchBooksByFilter(action: TableActions) {

    var obj: BookFilterParams = {
      dateBook: this.searchForm.get('dateBook')?.value,
      bookStatus: this.searchForm.get('bookStatus')?.value,
      clientId: this.searchForm.get('clientId')?.value,
      workerId: this.searchForm.get('workerId')?.value,
      filterDateBy: this.searchForm.get('filterDateBy')?.value,
    };

    //this.book.emit({book,action});
    this.book.emit({ obj, action });

  }

  //clear the filter parameters
  clearSearch() {
    this.searchForm.reset();
  }

  //load the users, that will be used as a filter
  loadUsersByRole(role: string) {
    this.userService.getUsersByRole(role).pipe(
      tap(users => {
        if (role === 'WORKER') {
          this.workers = users;
        } else {
          this.clients = users;
        }
      }),
      catchError(error => {
        console.error('Error loading users by role: ' + role, error);
        return [];
      })
    ).subscribe();
  }

  getFullName(user: User, userFields: (keyof User)[]): string {
    const nameParts = userFields.map(field => user[field]);
    return nameParts.join(' ');
  }


  getHeaderFields() {
    this.headerFields = this.headers.map((data) => data.fieldName);
    this.headerFields.push("actions");
  }

  // selectBook(book: Book, action:TableActions) {
  //   this.book.emit({book,action})
  // }

  executeActionBook(obj: any, action: TableActions) {
    this.book.emit({ obj, action })
  }

  //modal delete confirmation
  openDeleteConfirmationDialog(book: Book, action: TableActions): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: 'Are you sure you want to delete this item?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.executeActionBook(book, action)
      }
    });
  }

  // get the values from enum BookStatus 
  getBookStatusValues(): string[] {
    return Object.keys(bookStatusLabels);
  }

  // get the name in enum BookStatus
  getStatusName(statusValue: string): string {
    return bookStatusLabels[statusValue];
  }

  generatePDF() {
    // Get the element to converte to PDF
    const element = document.getElementById('pdf');

    // Use html2canvas to convert element HTML to an image
    if (element) {
      html2canvas(element).then((canvas) => {

        const imgWidth = 200; // Largura da imagem no PDF //235 foi um bom numero
        const imgHeight = (imgWidth / canvas.width) * canvas.height;

        //generate a image
        const imgData = canvas.toDataURL('image/png');

        // generate a pdf
        const pdf = new jsPDF.default('p', 'mm', 'a4');

        // Add the page to pdf
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        //pdf.addImage(imgData, 'PNG', 10, 10, canvas.width, canvas.height);

        //save to pdf
        pdf.save('book-list.pdf');
      });
    }
  }

}
