import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TreatmentState } from './treatment.reducers';

export const selectTreatmentState = createFeatureSelector<TreatmentState>('treatmentState')

export const selectTreatments = () => createSelector(
    selectTreatmentState,
    (state: TreatmentState) => state.treatments
)

export const selectTreatment = (id:number) => createSelector(
    selectTreatmentState,
    (state:TreatmentState) => state.treatments.find(d => d.id === d.id)
)