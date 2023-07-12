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

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  books: ReadonlyArray<Book> = [];
  books$ = this.store.select(selectBooks());
  
  
  headers: { headerName: string, fieldName: keyof Book, userName?: (keyof User)[] }[] = [
    //{ headerName: "User", fieldName: "user", userName: ["firstName", "lastName"] },        
    { headerName: "dateBook", fieldName: "dateBook" },
    { headerName: "start time", fieldName: "startTimeBook" },
    { headerName: "Finish Time", fieldName: "finishTimeBook" },
    // id:number;
    // userId: number;
    // userName:string;
    // dateBook:Date;
    // startTimeBook:string;
    // finishTimeBook:string;
  ];
  
  
  constructor(
    private router: Router, 
    private store: Store<AppState>,
  ){}

  ngOnInit(): void {  
    this.store.dispatch({ type: BookActions.GET_BOOK_LIST});
    this.assignBooks();
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
