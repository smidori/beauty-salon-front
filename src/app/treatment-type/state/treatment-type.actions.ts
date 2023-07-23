// import { createAction, props } from "@ngrx/store";
// import { TreatmentType } from "src/app/treatment/models/treatment-type.interface";

import { createAction, props } from "@ngrx/store";
import { TreatmentType } from "../models/treatment-type.interface";
//import { TreatmentType } from "src/app/treatment/models/treatment-type.interface";

export enum TreatmentTypeActions{
    GET_TREATMENT_TYPE_LIST = '[TreatmentType] Get TreatmentType List',
    SET_TREATMENT_TYPE_LIST = '[TreatmentType] Set TreatmentType List',
    ADD_TREATMENT_TYPE_API = '[TreatmentType] Add TreatmentType api',
    ADD_TREATMENT_TYPE_STATE = '[TreatmentType] Add TreatmentType state',
    UPDATE_TREATMENT_TYPE_API = '[TreatmentType] Update TreatmentType api',
    UPDATE_TREATMENT_TYPE_STATE = '[TreatmentType] Update TreatmentType state',
    DELETE_TREATMENT_TYPE_API = '[TreatmentType] Delete TreatmentType api',
    DELETE_TREATMENT_TYPE_STATE = '[TreatmentType] Delete TreatmentType state',

}

export const getTreatmentTypeList = createAction(
    TreatmentTypeActions.GET_TREATMENT_TYPE_LIST
)

export const setTreatmentTypeList = createAction(
    TreatmentTypeActions.SET_TREATMENT_TYPE_LIST,
    props<{treatmentTypes:ReadonlyArray<TreatmentType>}>()
)

export const addTreatmentTypeState = createAction(
    TreatmentTypeActions.ADD_TREATMENT_TYPE_STATE, props<{treatmentType: TreatmentType}>()
);

export const updateTreatmentTypeState = createAction(
    TreatmentTypeActions.UPDATE_TREATMENT_TYPE_STATE,
    props<{ treatmentType: TreatmentType }>()
);


export const deleteTreatmentTypeState = createAction(
    TreatmentTypeActions.DELETE_TREATMENT_TYPE_STATE, props<{treatmentTypeId: number}>()
)