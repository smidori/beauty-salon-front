import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AvailabilityService } from "../services/availability.service";
import { Router } from "@angular/router";
import { AvailabilityActions } from "./availability.action";
import { EMPTY, catchError, map, mergeMap, of, tap } from "rxjs";
import { Availability } from '../models/availability.interface';

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

    addAvailability$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AvailabilityActions.ADD_AVAILABILITY_API),
            mergeMap((data: { type: string, payload: Availability }) => this.availabilityService.addAvailability(data.payload)
                .pipe(
                    map(availabilities => ({ type: AvailabilityActions.ADD_AVAILABILITY_STATE, availability: data.payload })),
                    tap(() => this.router.navigate(["availabilities"])),
                    //catchError(() => EMPTY)
                    catchError((error) => of({ type: AvailabilityActions.ADD_AVAILABILITY_ERROR, error: error.error.message }))
                ))
        )
    }, { dispatch: true })


    updateAvailability$ = createEffect(() => {
         return this.actions$.pipe(
            ofType(AvailabilityActions.UPDATE_AVAILABILITY_API),
            mergeMap((data: {type: string, payload: Availability}) =>
            this.availabilityService.updateAvailability(data.payload.id, data.payload)
            .pipe(
                map(availabilities => ({type: AvailabilityActions.UPDATE_AVAILABILITY_STATE, availability: data.payload})),
                tap(() => this.router.navigate(["availabilities"])),
                //catchError(() => EMPTY)
                catchError((error) => of({ type: AvailabilityActions.ADD_AVAILABILITY_ERROR, error: error.error.message }))

            ))
        )
    }, {dispatch: true})

    deleteAvailability$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AvailabilityActions.DELETE_AVAILABILITY_API),
            mergeMap((data: {payload: number }) => this.availabilityService.deleteAvailability(data.payload)
            .pipe(
                map(() => ({type: AvailabilityActions.DELETE_AVAILABILITY_STATE, availabilityId: data.payload})),
                catchError(() => EMPTY)
            ))
        )
    })
}