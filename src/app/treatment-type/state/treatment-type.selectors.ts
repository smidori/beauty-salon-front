// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { TreatmentTypeState } from './treatment-type.reducers';

import { createFeatureSelector, createSelector } from "@ngrx/store"
import { TreatmentTypeState } from "./treatment-type.reducers"

export const selectTreatmentTypeState = createFeatureSelector<TreatmentTypeState>('treatmentTypeState')

export const selectTreatmentTypes = () => createSelector(
    selectTreatmentTypeState,
    (state: TreatmentTypeState) => state.treatmentTypes
)

export const selectTreatmentType = (id:number) => createSelector(
    selectTreatmentTypeState,
    (state:TreatmentTypeState) => state.treatmentTypes.find(d => d.id == id)
)