import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';
// import { User } from '../../models/user.interface';
import { AuthActions, clearError } from '../../state/auth.actions';
import { selectError } from '../../state/auth.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLogin } from '../../models/user.interface';
import { clearUserError } from 'src/app/user/state/user.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  error$ = this.store.select(selectError());
 
  constructor(private store: Store, 
              private authService: AuthenticateService, 
              private router: Router, 
              private _snackBar: MatSnackBar) {
    
    this.checkJWT();
    this.getError();
  }

  submit(data: UserLogin) {
    this.store.dispatch({type: AuthActions.LOGIN, payload: data})
  }

  getError() {
    this.error$.subscribe(data => {
      if(data) {
        this._snackBar.open(data.message, "Dismiss",{
          duration: 5000, // Close after 5 seconds 
        }).onAction().subscribe(() => {
          console.log("dismiss click")
          this.store.dispatch(clearError());
        });

        setTimeout(() => {
          this.store.dispatch(clearError());
        }, 5000);
      }
    })
  }

  checkJWT() {
    if(this.authService.isAuthenticated()) {
      console.log("checkJWT ==> isAutehnticated ");
      this.router.navigate(['/users'])
    }
  }

}