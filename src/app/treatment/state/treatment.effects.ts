import { EMPTY, map } from 'rxjs';
import { mergeMap, catchError } from 'rxjs';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { TreatmentService } from '../services/treatment.service';
import { TreatmentActions } from './treatment.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';

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

}