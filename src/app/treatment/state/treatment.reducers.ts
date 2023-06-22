import { createReducer, on } from "@ngrx/store";
import { Treatment } from "../models/treatment.interface";
import { setTreatmentList } from "./treatment.actions";

export interface TreatmentState{
    treatments: ReadonlyArray<Treatment>;
}

export const initialState: TreatmentState = {
    treatments: []
}

export const treatmentReducer = createReducer(
    initialState, 
    on(setTreatmentList, (state, {treatments}) => {return {...state, treatments}} )
)