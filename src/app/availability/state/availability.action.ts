import { createAction, props } from "@ngrx/store";
import { Availability } from "../models/availability.interface";

export enum AvailabilityActions{
    GET_AVAILABILITY_LIST = '[Availability] Get Availability list',
    SET_AVAILABILITY_LIST = '[Availability] Set Availability list',
    ADD_AVAILABILITY_API = '[Availability] Add Availability api',
    ADD_AVAILABILITY_STATE = '[Availability] Add Availability state',
    UPDATE_AVAILABILITY_API = '[Availability] Update Availability api',
    UPDATE_AVAILABILITY_STATE = '[Availability] Update Availability state',
    DELETE_AVAILABILITY_API = '[Availability] Delete Availability api',
    DELETE_AVAILABILITY_STATE = '[Availability] Delete Availability state',
}


export const getAvailabilityList = createAction(
    AvailabilityActions.GET_AVAILABILITY_LIST
);

export const setAvailabilityList = createAction(
    AvailabilityActions.SET_AVAILABILITY_LIST,
    props<{availabilities:ReadonlyArray<Availability>}>()
)

export const addAvailabilityState = createAction(
    AvailabilityActions.ADD_AVAILABILITY_STATE, props<{availability: Availability}>()
);

export const updateAvailabilityState = createAction(
    AvailabilityActions.UPDATE_AVAILABILITY_STATE,
    props<{ availability: Availability }>()
);


export const deleteAvailabilityState = createAction(
    AvailabilityActions.DELETE_AVAILABILITY_STATE, props<{availabilityId: number}>()
)