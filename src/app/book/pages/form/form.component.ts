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
import { BookActions, clearBookError } from '../../state/book.action';
import { selectBooks, selectBook, selectError } from '../../state/book.selectors';
import { UserService } from 'src/app/user/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  error$: Observable<string | null>;

  constructor(
    private acRouter: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar) {
      
    const id = this.acRouter.snapshot.params['id'];
    this.book$ = this.store.select(selectBook(id));
    this.book$.subscribe(d => {
      if (d) {
        this.menuTitle = "Update Book";
        this.book = d;
      }
    });
    this.error$ = this.store.select(selectError);
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

    this.error$.subscribe((error) => {
      if (error) {
        this.snackBar.open(error, 'Dismiss', {
          duration: 5000, // Close after 5 seconds 
        });
      }
    });
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
    this.store.dispatch(clearBookError());
    switch (data.action) {
      case "Create": {
        this.store.dispatch({ type: BookActions.ADD_BOOK_API, payload: data.value });
        return;
      }
      case "Update": {
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