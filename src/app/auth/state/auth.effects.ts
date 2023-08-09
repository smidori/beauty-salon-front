import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';
import { AuthActions, setAuthentication, setUserDetails } from './auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { User } from 'src/app/user/models/user.interface';
import { ResetPwd, UserLogin } from '../models/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';



 
@Injectable()
export class AuthEffects {
 
  constructor(
    private actions$: Actions,
    private authService: AuthenticateService,
    private router: Router,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {}

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        mergeMap(((data: {type: string, payload: UserLogin}) => this.authService.login(data.payload)
          .pipe(
            //map(data => ({ type: AuthActions.SET_TOKEN, token: data.token })),
            map(data => {
              this.store.dispatch(setUserDetails({ userDetails: data.userDetails }));
              return { type: AuthActions.SET_TOKEN, token: data.token };
            }),
            tap((response) => {
              this.store.dispatch(setAuthentication({ isAuthenticated: true }));
              this.router.navigate(['treatments']);
            }),
            catchError(async (data) => ({ type: AuthActions.LOGIN_ERROR, error: data.error }))
          ))
        ))
    }, {dispatch: true}
  );
  

  resetPwd$ = createEffect(() => {
    
    return this.actions$.pipe(
        ofType(AuthActions.RESET_PWD),
        mergeMap(((data: {type: string, payload: ResetPwd}) => this.authService.resetPwd(data.payload)
          .pipe(
            tap(() => {
              this.router.navigate(["/login"]);
              this.snackBar.open('Email sent successfully !', 'Dismiss', {
                duration: 3000, 
              });
              }),
            catchError(async (data) => ({ type: AuthActions.LOGIN_ERROR, error: data.error }))
          ))
        ))
    }, {dispatch: true}
  );
 

  createUser$ = createEffect(() => {
    
    return this.actions$.pipe(
        ofType(AuthActions.CREATE_USER),
        mergeMap(((data: {type: string, payload: User}) => this.authService.register(data.payload)
          .pipe(
            // map(data => ({ type: AuthActions.SET_TOKEN, token: data.token })),
            map(data => {
              this.store.dispatch(setUserDetails({ userDetails: data.userDetails }));
              return { type: AuthActions.SET_TOKEN, token: data.token };
            }),
            tap(() => {
              this.store.dispatch(setAuthentication({ isAuthenticated: true }));
              this.router.navigate(["treatments"]);
              }),
            catchError(async (data) => ({ type: AuthActions.LOGIN_ERROR, error: data.error }))
          ))
        ))
    }, {dispatch: true}
  );
  
}