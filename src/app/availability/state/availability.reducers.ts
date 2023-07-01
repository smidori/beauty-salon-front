import { createReducer, on } from "@ngrx/store";
import { Availability } from "../models/availability.interface";
import { setAvailabilityList } from "./availability.action";

export interface AvailabilityState{
    availabilities: ReadonlyArray<Availability>;
}

export const initialState: AvailabilityState = {
    availabilities: []
}

export const availabilityReducer = createReducer(
    initialState,
    on(setAvailabilityList, (state, { availabilities }) => { return {...state, availabilities}}),
)