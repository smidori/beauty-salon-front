
import { createAction, props } from "@ngrx/store";
import { Treatment } from "../models/treatment.interface";

export enum TreatmentActions{
    GET_TREATMENT_LIST = '[Treatment] Get Treatment List',
    SET_TREATMENT_LIST = '[Treatment] Set Treatment List'
}

export const getTreatmentList = createAction(
    TreatmentActions.GET_TREATMENT_LIST
)

export const setTreatmentList = createAction(
    TreatmentActions.SET_TREATMENT_LIST,
    props<{treatments:ReadonlyArray<Treatment>}>()
)