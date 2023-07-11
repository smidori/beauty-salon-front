import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TreatmentTypeService } from "../services/treatment-type.service";
import { Router } from "@angular/router";
import { TreatmentTypeActions } from "./treatment-type.actions";
import { EMPTY, catchError, map, mergeMap, tap } from "rxjs";
import { TreatmentType } from "../models/treatment-type.interface";
//import { TreatmentType } from "src/app/treatment/models/treatment-type.interface";

@Injectable()
export class TreatmentTypeEffects{
    constructor(
        private actions$: Actions,
        private treatmentTypeService: TreatmentTypeService,
        private router: Router){}

    
    getTreatmentType$ = createEffect(() => {
        console.log("---------- create Effect TreatmentType")
        return this.actions$.pipe(
            ofType(TreatmentTypeActions.GET_TREATMENT_TYPE_LIST),
            mergeMap(() => this.treatmentTypeService.getTreatmentTypes()
            .pipe(
                map(treatmentTypes => ({type: TreatmentTypeActions.SET_TREATMENT_TYPE_LIST, treatmentTypes})),
                catchError(() => EMPTY)
            ))
        )}, {dispatch:true}
    );

    addTreatmentType$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TreatmentTypeActions.ADD_TREATMENT_TYPE_API),
            mergeMap((data: { type: string, payload: TreatmentType }) => this.treatmentTypeService.addTreatmentType(data.payload)
                .pipe(
                    map(treatmentTypes => ({ type: TreatmentTypeActions.ADD_TREATMENT_TYPE_STATE, treatmentType: data.payload })),
                    tap(() => this.router.navigate(["treatment-types"])),
                    catchError(() => EMPTY)
                ))
        )
    }, { dispatch: true })

    updateTreatmentType$ = createEffect(() => {
         return this.actions$.pipe(
            ofType(TreatmentTypeActions.UPDATE_TREATMENT_TYPE_API),
            mergeMap((data: {type: string, payload: TreatmentType}) =>
            this.treatmentTypeService.updateTreatmentType(data.payload.id, data.payload)
            .pipe(
                map(treatmentTypes => ({type: TreatmentTypeActions.UPDATE_TREATMENT_TYPE_STATE, treatmentType: data.payload})),
                tap(() => this.router.navigate(["treatmentTypes"])),
                catchError(() => EMPTY)
            ))
        )
    }, {dispatch: true})

    deleteTreatmentType$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TreatmentTypeActions.DELETE_TREATMENT_TYPE_API),
            mergeMap((data: {payload: number }) => this.treatmentTypeService.deleteTreatmentType(data.payload)
            .pipe(
                map(() => ({type: TreatmentTypeActions.DELETE_TREATMENT_TYPE_STATE, treatmentTypeId: data.payload})),
                catchError(() => EMPTY)
            ))
        )
    })
}