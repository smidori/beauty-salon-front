import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { UserActions, clearUserError } from '../../state/user.actions';
import { selectError, selectUser } from '../../state/user.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { AppState } from 'src/app/state/app.state';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  user$: Observable<User | undefined>;
  user: User | null = null;
  //error: string | null;
  error$: Observable<string | null>;

  constructor(private acRouter: ActivatedRoute, 
              private store: Store<AppState>,
              private snackBar: MatSnackBar){
    //initialize the variables
    const id = this.acRouter.snapshot.params['id'];
    //this.error = "TESTE DE ERRO PARA VER COMO FICA";
    this.error$ = this.store.select(selectError);
    this.user$ = this.store.select(selectUser(id));
    this.user$.subscribe(d => {
      if (d) {
        this.user = d;
        console.log("loaded user id => " + this.user?.id);
      }
    });        
  }

  ngOnInit(): void {
    this.error$.subscribe((error) => {
      if (error) {
        this.snackBar.open(error, 'Dismiss', {
          duration: 5000, // Define a duração do Snackbar em milissegundos (opcional)
          panelClass: ['snackbar-error'] // Adiciona uma classe CSS personalizada para estilizar o Snackbar (opcional)
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
  
}
