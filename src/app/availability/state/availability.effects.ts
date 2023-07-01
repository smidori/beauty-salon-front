import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AvailabilityService } from "../services/availability.service";
import { Router } from "@angular/router";
import { AvailabilityActions } from "./availability.action";
import { EMPTY, catchError, map, mergeMap } from "rxjs";

@Injectable()
export class AvailabilityEffects {
    constructor(
        private actions$: Actions,
        private availabilityService: AvailabilityService,
        private router: Router
    ) { }


    getAvailabilities$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AvailabilityActions.GET_AVAILABILITY_LIST),
            mergeMap(() => this.availabilityService.getAvailabilities()
                .pipe(
                    map(availabilities => ({ type: AvailabilityActions.SET_AVAILABILITY_LIST, availabilities })),
                    catchError(() => EMPTY)
                ))
        )
    }, { dispatch: true }
    );
}