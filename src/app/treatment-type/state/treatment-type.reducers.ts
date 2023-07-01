import { createReducer, on } from "@ngrx/store";
//import { TreatmentType } from "src/app/treatment/models/treatment-type.interface";
import { addTreatmentTypeState, deleteTreatmentTypeState, setTreatmentTypeList, updateTreatmentTypeState } from "./treatment-type.actions";
import { TreatmentType } from "../models/treatment-type.interface";

export interface TreatmentTypeState{
    treatmentTypes: ReadonlyArray<TreatmentType>;
}

export const initialState: TreatmentTypeState = {
    treatmentTypes: []
}

export const treatmentTypeReducer = createReducer(
    initialState, 
    on(setTreatmentTypeList, (state, {treatmentTypes}) => {return {...state, treatmentTypes}} ),
    on(addTreatmentTypeState, (state, {treatmentType}) => {return {...state, treatmentTypes:[...state.treatmentTypes, treatmentType]}}),
    on(updateTreatmentTypeState, (state, {treatmentType}) => {
        return {...state, treatmentTypes: state.treatmentTypes.map(data => data.id === treatmentType.id ? treatmentType : data)}
      }),
    on(deleteTreatmentTypeState, (state, {treatmentTypeId}) => 
    {return {...state, treatmentTypes: state.treatmentTypes.filter(data => data.id != treatmentTypeId)}
    }),
)