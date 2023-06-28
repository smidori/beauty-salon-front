import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { UserActions } from '../../state/user.actions';
import { selectUser } from '../../state/user.selectors';
//import { AppState } from 'src/app/state/app.state';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  user$: Observable<User | undefined>;
  user: User | null = null;

  constructor(private acRouter: ActivatedRoute, 
              private store: Store<AppState>){
    const id = this.acRouter.snapshot.params['id'];
    this.user$ = this.store.select(selectUser(id));
    this.user$.subscribe(d => {
      if (d) {
        this.user = d;
        console.log("loaded user id => " + this.user?.id);
      }
    });        
  }

  ngOnInit(): void {
      
  }

  formAction(data : {value:User, action: string}){
    console.log("formAction for user => " + JSON.stringify(data.value) );
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
