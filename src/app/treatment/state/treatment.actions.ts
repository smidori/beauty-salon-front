
import { createAction, props } from "@ngrx/store";
import { Treatment } from "../models/treatment.interface";

export enum TreatmentActions{
    GET_TREATMENT_LIST = '[Treatment] Get Treatment List',
    SET_TREATMENT_LIST = '[Treatment] Set Treatment List',
    ADD_TREATMENT_API = '[Treatment] Add Treatment api',
    ADD_TREATMENT_STATE = '[Treatment] Add Treatment state',
    UPDATE_TREATMENT_API = '[Treatment] Add Treatment api',
    UPDATE_TREATMENT_STATE = '[Treatment] Add Treatment state',
    DELETE_TREATMENT_API = '[Treatment] Delete Treatment api',
    DELETE_TREATMENT_STATE = '[Treatment] Delete Treatment state',

}

export const getTreatmentList = createAction(
    TreatmentActions.GET_TREATMENT_LIST
)

export const setTreatmentList = createAction(
    TreatmentActions.SET_TREATMENT_LIST,
    props<{treatments:ReadonlyArray<Treatment>}>()
)

export const addTreatmentState = createAction(
    TreatmentActions.ADD_TREATMENT_STATE, props<{treatment: Treatment}>()
);

export const updateTreatmentState = createAction(
    TreatmentActions.UPDATE_TREATMENT_STATE,
    props<{ treatment: Treatment }>()
);


export const deleteTreatmentState = createAction(
    TreatmentActions.DELETE_TREATMENT_STATE, props<{treatmentId: number}>()
)