import { createReducer, on } from "@ngrx/store";
import { Treatment } from "../models/treatment.interface";
import { addTreatmentState, deleteTreatmentState, setTreatmentList, updateTreatmentState } from "./treatment.actions";

export interface TreatmentState{
    treatments: ReadonlyArray<Treatment>;
}

export const initialState: TreatmentState = {
    treatments: []
}

export const treatmentReducer = createReducer(
    initialState, 
    //on(setTreatmentList, (state, {treatments}) => {return {...state, treatments}} ),

    on(setTreatmentList, (state, { treatments }) => {
        console.log('Reducer treatments state:', {...state, treatments});
        return {...state, treatments};
      }),

    on(addTreatmentState, (state, {treatment}) => {return {...state, treatments:[...state.treatments, treatment]}}),
    on(updateTreatmentState, (state, {treatment}) => {
        return {...state, treatments: state.treatments.map(data => data.id === treatment.id ? treatment : data)}
      }),
    on(deleteTreatmentState, (state, {treatmentId}) => 
    {return {...state, treatments: state.treatments.filter(data => data.id != treatmentId)}
    }),
)