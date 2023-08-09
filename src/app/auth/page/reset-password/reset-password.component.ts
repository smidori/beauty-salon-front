import { Component } from '@angular/core';
import { selectError } from '../../state/auth.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';
import { AuthActions, clearError } from '../../state/auth.actions';
import { ResetPwd } from '../../models/user.interface';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  error$ = this.store.select(selectError());
 
  constructor(private store: Store, 
              private authService: AuthenticateService, 
              private router: Router, 
              private _snackBar: MatSnackBar) {
    
    
    this.getError();
  }

  submit(data: ResetPwd) {
    this.store.dispatch({type: AuthActions.RESET_PWD, payload: data})
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

}
