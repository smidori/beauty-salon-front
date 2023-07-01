import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TreatmentService } from '../services/treatment.service';
import { TreatmentActions } from './treatment.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, mergeMap, tap } from "rxjs";
import { Treatment } from '../models/treatment.interface';

@Injectable()
export class TreatmentEffects{
    constructor(
        private actions$: Actions,
        private treatmentService: TreatmentService,
        private router: Router){}

    
    getTreatment$ = createEffect(() => {
        console.log("---------- create Effect Treatment")
        return this.actions$.pipe(
            ofType(TreatmentActions.GET_TREATMENT_LIST),
            mergeMap(() => this.treatmentService.getTreatments()
            .pipe(
                map(treatments => ({type: TreatmentActions.SET_TREATMENT_LIST, treatments})),
                catchError(() => EMPTY)
            ))
        )}, {dispatch:true}
    );

    addTreatment$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TreatmentActions.ADD_TREATMENT_API),
            mergeMap((data: { type: string, payload: Treatment }) => this.treatmentService.addTreatment(data.payload)
                .pipe(
                    map(treatments => ({ type: TreatmentActions.ADD_TREATMENT_STATE, treatment: data.payload })),
                    tap(() => this.router.navigate(["treatments"])),
                    catchError(() => EMPTY)
                ))
        )
    }, { dispatch: true })

    updateTreatment$ = createEffect(() => {
         return this.actions$.pipe(
            ofType(TreatmentActions.UPDATE_TREATMENT_API),
            mergeMap((data: {type: string, payload: Treatment}) =>
            this.treatmentService.updateTreatment(data.payload.id, data.payload)
            .pipe(
                map(treatments => ({type: TreatmentActions.UPDATE_TREATMENT_STATE, treatment: data.payload})),
                tap(() => this.router.navigate(["treatments"])),
                catchError(() => EMPTY)
            ))
        )
    }, {dispatch: true})

    deleteTreatment$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TreatmentActions.DELETE_TREATMENT_API),
            mergeMap((data: {payload: number }) => this.treatmentService.deleteTreatment(data.payload)
            .pipe(
                map(() => ({type: TreatmentActions.DELETE_TREATMENT_STATE, treatmentId: data.payload})),
                catchError(() => EMPTY)
            ))
        )
    })
}