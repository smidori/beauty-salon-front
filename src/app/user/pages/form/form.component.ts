import { catchError, throwError } from 'rxjs';
import { UserService } from 'src/app/user/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../../models/user.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { UserActions, clearUserError } from '../../state/user.actions';
import { selectError, selectUser } from '../../state/user.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommandBarActions } from 'src/app/shared/enums/command-bar-actions.enum';
import { JsonPipe } from '@angular/common';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';
//import { AppState } from 'src/app/state/app.state';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  menuTitle: string = 'Create User';

  //user$: Observable<User | undefined>;
  //user: User | null = null;
  userId : number | undefined;
  //error: string | null;
  error$: Observable<string | null>;
  isVisibleCreate = false;
  isVisibleList = false;

  constructor(private acRouter: ActivatedRoute, 
              private store: Store<AppState>,
              private snackBar: MatSnackBar,
              private router: Router,
              private userService: UserService,
              private auth: AuthenticateService){

    //initialize the variables
    const id = this.acRouter.snapshot.params['id'];
    //console.log("user => constructor id " + id);
    this.error$ = this.store.select(selectError);

    if(id){
      this.userId = id;
      this.menuTitle = "Update User";
    }

    if(this.auth.isAdmin()){
      this.isVisibleCreate = true;
      this.isVisibleList = true;
    }
    
    //PEGAR DIRETO VIA WEB SERVICE
    // this.userService.getUserById(id).pipe(
    //   catchError(error => {
    //     return throwError(() => 'Error to loading the user by id + ' + id);
    //   })
    // ).subscribe(
    //   (user: User) => {
    //     this.menuTitle = "Update User";
    //     console.log("user => " + JSON.stringify(user))
    //     this.user = user;
    //   }
    // );

    // this.user$ = this.userService.getUserById(id).pipe(
    //   map( (user:User) => {
    //     return user
    //   }),
    //   catchError(error => {
    //     return throwError(() => 'Error to loading the user by id + ' + id);
    //   })
    // );
    // this.user$.subscribe((user: User|undefined) => {
    //   if (user) {
    //     this.menuTitle = "Update User";
    //     this.user = user;
    //     console.log("user => " + JSON.stringify(user));
    //   }
    // });
    

    // this.user$ = this.store.select(selectUser(id));
    // this.user$.subscribe(d => {
    //   if (d) {
    //     this.menuTitle = "Update User";
    //     this.user = d;
    //   }
    // });        
  }

  ngOnInit(): void {
    this.error$.subscribe((error) => {
      if (error) {
        this.snackBar.open(error, 'Dismiss', {
          duration: 5000, // Close after 5 seconds 
          panelClass: ['snackbar-error'] // css
        });
      }
    });
  }

  formAction(data : {value:User, action: string}){
    console.log("formAction for user => " + JSON.stringify(data.value) );
    this.store.dispatch(clearUserError());
    switch(data.action){
      case "Create" : {
        this.store.dispatch({type: UserActions.ADD_USER_API, payload: data.value});
        return;
      }
      case "Update" : {
        this.store.dispatch({type: UserActions.UPDATE_USER_API, payload: data.value});
        return;
      }
      default: ""
    }
  }

  //navigate to the page
  executeCommandBarAction(action: CommandBarActions) {
    this.store.dispatch(clearUserError());
    switch (action) {
      case CommandBarActions.Create: {
        this.router.navigate(["users", "form"]);
        return;
      }
      case CommandBarActions.List: {
        this.router.navigate(["users", "list"]);
        return;
      }
      default: ""
    }
  }
}
