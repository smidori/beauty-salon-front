import { BookService } from 'src/app/book/services/book.service';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TableActions } from 'src/app/shared/enums/table-actions.enum';
import { User } from 'src/app/user/models/user.interface';
import { Book } from '../../model/book.interface';
import { bookStatusLabels } from '../../model/book-status.enum';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/user/services/user.service';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit{
  @Input() headers: Array<{ headerName: string, fieldName: keyof Book, userName?: (keyof User)[] }> = []
  @Input() books: ReadonlyArray<Book> = [];
  @Output() book = new EventEmitter<{book: Book, action:TableActions}>();
  headerFields:string[] = [];

  workers: User[] = [];
  clients: User[] = [];
  searchForm: FormGroup;
  
  constructor(private fb:FormBuilder, private userService: UserService,private bookService: BookService) {

    this.searchForm = this.fb.group({
      dateBook: [null],
      workerId : [null],
      clientId : [null],
      bookStatus: [null],
    });

    this.loadUsersByRole("CLIENT");
    this.loadUsersByRole("WORKER");
  }

  //search the book using the filter in the screen
  searchBooksByFilter(){
    this.bookService.getBooksByFilter(this.searchForm.value).subscribe(
      (books) => {
          this.books = books;
      },
      (error) => {
        console.error('Error loading books: ', error);
      }
    );
  }
  //clear the filter parameters
  clearSearch(){
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

  
  ngOnInit(): void {
    this.getHeaderFields();
  }

  getHeaderFields(){
    this.headerFields = this.headers.map((data) => data.fieldName);
    this.headerFields.push("actions");
  }

  selectBook(book: Book, action:TableActions) {
    this.book.emit({book,action})
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
    if(element){
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
