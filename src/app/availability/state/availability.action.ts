import { createAction, props } from "@ngrx/store";
import { Availability } from "../models/availability.interface";

export enum AvailabilityActions{
    GET_AVAILABILITY_LIST = '[Availability] Get Availability list',
    SET_AVAILABILITY_LIST = '[Availability] Set Availability list'
}


export const getAvailabilityList = createAction(
    AvailabilityActions.GET_AVAILABILITY_LIST
);

export const setAvailabilityList = createAction(
    AvailabilityActions.SET_AVAILABILITY_LIST,
    props<{availabilities:ReadonlyArray<Availability>}>()
)