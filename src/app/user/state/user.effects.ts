import { Injectable } from "@angular/core";
import { UserService } from "../services/user.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { UserActions } from "./user.actions";
import { EMPTY, catchError, map, mergeMap } from "rxjs";

@Injectable()
export class UserEffects{
    constructor(
        private actions$ :Actions,
        private userService: UserService,
        private router: Router
    ){}



    getUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.GET_USER_LIST),
            mergeMap(() => this.userService.getUsers()
            .pipe(
                map(users => ({type: UserActions.SET_USER_LIST,users})),
                catchError(() => EMPTY)
            ))
        )}, {dispatch: true}
    );



}