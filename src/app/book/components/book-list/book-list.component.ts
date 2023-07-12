import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableActions } from 'src/app/shared/enums/table-actions.enum';
import { User } from 'src/app/user/models/user.interface';
import { Book } from '../../model/book.interface';

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

  constructor() {}
  
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
}
