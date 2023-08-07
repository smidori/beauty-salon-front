import { createReducer, on } from "@ngrx/store";
import { Availability } from "../models/availability.interface";
import { addAvailabilityError, addAvailabilityState, clearAvailabilityError, deleteAvailabilityState, setAvailabilityList, updateAvailabilityState } from "./availability.action";

export interface AvailabilityState{
    availabilities: ReadonlyArray<Availability>;
    error: string | null; 
}

export const initialState: AvailabilityState = {
    availabilities: [],
    error: null
}

export const availabilityReducer = createReducer(
    initialState,
    on(setAvailabilityList, (state, { availabilities }) => { return {...state, availabilities}}),
    //on(addAvailabilityState, (state, {availability}) => {return {...state, availabilities:[...state.availabilities, availability]}}),
    on(addAvailabilityState, (state, {availability}) => {return {...state, availabilities:[...state.availabilities, availability], error: null}}),
    // on(updateAvailabilityState, (state, {availability}) => {
    //     return {...state, availabilities: state.availabilities.map(data => data.id === availability.id ? availability : data)}
    //   }),
    on(updateAvailabilityState, (state, {availability}) => ({
    ...state,
    availabilities: state.availabilities.map((data) => (data.id === availability.id ? availability : data)),
    error: null, // clean the error message in case success
    })),

    on(deleteAvailabilityState, (state, {availabilityId}) => 
    {return {...state, availabilities: state.availabilities.filter(data => data.id != availabilityId)}
    }),
    //update the state with the message error
    on(addAvailabilityError, (state, { error }) => ({ ...state, error })),
    
    on(clearAvailabilityError, (state) => ({ ...state, error: null }))
)