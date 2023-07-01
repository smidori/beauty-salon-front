import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AvailabilityState } from "./availability.reducers"

export const selectAvailabilityState = createFeatureSelector<AvailabilityState>('availabilityState')
export const selectAvailabilities = () => createSelector(
    selectAvailabilityState,
    (state: AvailabilityState) => state.availabilities
)

export const selectAvailability = (id: number) => createSelector(
    selectAvailabilityState,
    (state: AvailabilityState) => {
        console.log('state.availabilities => ', state.availabilities);
        const availability = state.availabilities.find(d => {      
            return d.id == id;
          });
        console.log("availability ==> " + availability);
        return availability;
    }
);