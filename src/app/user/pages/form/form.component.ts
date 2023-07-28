import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { UserActions, clearUserError } from '../../state/user.actions';
import { selectError, selectUser } from '../../state/user.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommandBarActions } from 'src/app/shared/enums/command-bar-actions.enum';
//import { AppState } from 'src/app/state/app.state';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  menuTitle: string = 'Create User';

  user$: Observable<User | undefined>;
  user: User | null = null;
  //error: string | null;
  error$: Observable<string | null>;

  constructor(private acRouter: ActivatedRoute, 
              private store: Store<AppState>,
              private snackBar: MatSnackBar,
              private router: Router){
    //initialize the variables
    const id = this.acRouter.snapshot.params['id'];
    
    this.error$ = this.store.select(selectError);
    this.user$ = this.store.select(selectUser(id));
    this.user$.subscribe(d => {
      if (d) {
        this.menuTitle = "Update User";
        this.user = d;
      }
    });        
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
