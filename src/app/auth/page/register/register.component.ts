import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../state/auth.actions';
import { User } from 'src/app/user/models/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: string = "";

  constructor(private store: Store) {

  }

  ngOnInit(): void {
    
  }

  submit(data: User) {
    console.log("submit user register");
    this.store.dispatch({type: AuthActions.CREATE_USER, payload: data})
  }

}