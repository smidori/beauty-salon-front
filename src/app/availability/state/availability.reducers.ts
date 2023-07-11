import { createReducer, on } from "@ngrx/store";
import { Availability } from "../models/availability.interface";
import { addAvailabilityState, deleteAvailabilityState, setAvailabilityList, updateAvailabilityState } from "./availability.action";

export interface AvailabilityState{
    availabilities: ReadonlyArray<Availability>;
}

export const initialState: AvailabilityState = {
    availabilities: []
}

export const availabilityReducer = createReducer(
    initialState,
    on(setAvailabilityList, (state, { availabilities }) => { return {...state, availabilities}}),
    on(addAvailabilityState, (state, {availability}) => {return {...state, availabilities:[...state.availabilities, availability]}}),
    on(updateAvailabilityState, (state, {availability}) => {
        return {...state, availabilities: state.availabilities.map(data => data.id === availability.id ? availability : data)}
      }),
    on(deleteAvailabilityState, (state, {availabilityId}) => 
    {return {...state, availabilities: state.availabilities.filter(data => data.id != availabilityId)}
    }),
)