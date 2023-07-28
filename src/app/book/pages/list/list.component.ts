import { BookFilterParams } from './../../model/bookSearchParams.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommandBarActions } from 'src/app/shared/enums/command-bar-actions.enum';
import { TableActions } from 'src/app/shared/enums/table-actions.enum';
import { AppState } from 'src/app/state/app.state';
import { User } from 'src/app/user/models/user.interface';
import { Book } from '../../model/book.interface';
import { BookActions } from '../../state/book.action';
import { selectBooks } from '../../state/book.selectors';
import { BookService } from '../../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  books: ReadonlyArray<Book> = [];
  books$ = this.store.select(selectBooks());
  
  
  headers: { headerName: string, fieldName: keyof Book, userName?: (keyof User)[] }[] = [
    { headerName: "Date", fieldName: "dateBook" },
    { headerName: "Start time", fieldName: "startTimeBook" },
    { headerName: "Finish Time", fieldName: "finishTimeBook" },
    { headerName: "Treatment", fieldName: "treatmentName" },
    { headerName: "Professional", fieldName: "workerUserFirstName" },
    { headerName: "Client", fieldName: "clientUserFirstName" },
    { headerName: "Status", fieldName: "status" },  
    { headerName: "Observation", fieldName: "observation" },   
  ];
  
  
  constructor(
    private router: Router, 
    private store: Store<AppState>,
    private bookService: BookService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {  
    //this.store.dispatch({ type: BookActions.GET_BOOK_LIST});
    const filterParams: BookFilterParams = {
      dateBook: null, //will be replaced in the back end depends on the logged user
      status: null,
      clientId: null, //will be replaced in the back end depends on the logged user
      workerId: null, //will be replaced in the back end depends on the logged user
    };
    this.store.dispatch({ type: BookActions.GET_BOOK_LIST, payload: filterParams });

    this.assignBooks();

    this.bookService.onError().subscribe((error) => {
      if (error) {
        this.snackBar.open(error, 'Dismiss', {
          duration: 5000, // Close after 5 seconds 
        });
      }
    });
  }

  assignBooks() {
    this.books$.subscribe((data) => {
      this.books = data;
    });
  }

  selectBook(data: {book: Book, action: TableActions}) {
    switch(data.action) {
      case TableActions.View: {
        this.router.navigate(['books', 'form', data.book.id]);
        return;
      }
      case TableActions.Delete: {
        this.store.dispatch({type: BookActions.DELETE_BOOK_API, payload: data.book.id});
        return;
      }
      default: ""
    }
  }

  executeCommandBarAction(action: CommandBarActions){
    switch(action){
      case CommandBarActions.Create :{
        this.router.navigate(["books","form"]);
        return;
      }
      default: ""
    }
  }
}
