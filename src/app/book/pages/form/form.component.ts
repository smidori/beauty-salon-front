import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, tap } from 'rxjs';
import { CommandBarActions } from 'src/app/shared/enums/command-bar-actions.enum';
import { AppState } from 'src/app/state/app.state';
import { Treatment } from 'src/app/treatment/models/treatment.interface';
import { TreatmentActions } from 'src/app/treatment/state/treatment.actions';
import { selectTreatments } from 'src/app/treatment/state/treatment.selectors';
import { User } from 'src/app/user/models/user.interface';
import { UserActions } from 'src/app/user/state/user.actions';
import { selectUsers } from 'src/app/user/state/user.selectors';
import { Book } from '../../model/book.interface';
import { BookActions } from '../../state/book.action';
import { selectBooks, selectBook } from '../../state/book.selectors';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  menuTitle: string = 'Create Book';

  book$: Observable<Book | undefined>;
  book: Book | null = null;
  
  treatments: ReadonlyArray<Treatment> = [];
  treatments$ = this.store.select(selectTreatments());

  users: ReadonlyArray<User>=[];
  users$ = this.store.select(selectUsers());  

  constructor(
    private acRouter: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private userService: UserService) {
    const id = this.acRouter.snapshot.params['id'];
    this.book$ = this.store.select(selectBook(id));
    this.book$.subscribe(d => {
      if (d) {
        this.menuTitle = "Update Book";
        this.book = d;
      }
    });
  }


  ngOnInit(): void {
    
    //GET TREATMENT LIST
    this.store.dispatch({type: TreatmentActions.GET_TREATMENT_LIST});
    this.treatments$.subscribe((data) => {
      this.treatments = data;
    });

    // //GET USERS LIST
    // this.store.dispatch({type: UserActions.GET_USER_LIST});
    // this.users$.subscribe((data) => {
    //   this.users = data;
    // })
    this.loadUsersByRole('CLIENT');
  }

  //load the specific users
  loadUsersByRole(role: string) {
    this.userService.getUsersByRole(role).pipe(
      tap(users => {
          this.users = users;
      }),
      catchError(error => {
        console.error('Error loading users by role: ' + role, error);
        return [];
      })
    ).subscribe();
  }

  formAction(data: { value: Book, action: string }) {
    console.log("******************* formAction from pages BOOK ******************" )
    switch (data.action) {
      case "Create": {
        console.log("*********** create book => " + JSON.stringify(data.value));
        this.store.dispatch({ type: BookActions.ADD_BOOK_API, payload: data.value });
        return;
      }
      case "Update": {
        console.log("*********** update book => " + JSON.stringify(data.value));
        this.store.dispatch({ type: BookActions.UPDATE_BOOK_API, payload: data.value });
        return;
      }
      default: ""
    }
  }

  executeCommandBarAction(action: CommandBarActions) {
    switch (action) {
      case CommandBarActions.Create: {
        this.router.navigate(["books", "form"]);
        return;
      }
      case CommandBarActions.List: {
        this.router.navigate(["books", "list"]);
        return;
      }
      default: ""
    }
  }
}